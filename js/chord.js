//Do not change these variables! They will be used by other modules
var svgWidth;
var svgHeight;
var svgSimple;

var tags;
var tags_link;

var currentSelectedTag = 'unselected';
var selectedTags = [];

var lineWidth, lineHeight, lineInnerHeight, lineInnerWidth;
var lineMargin = { top: 300, right: 300, bottom: 300, left: 300 };

let nodes = [];


let links = [];

//Can modify this variable
var chord_data;

function init_chord(){

    d3.select('#chordtooltip').style("opacity", '0');

    svgSimple = d3.select('#chordPlotSVG');
    // svgWidth = svgSimple.node().clientWidth;
    // svgHeight = svgSimple.node().clientHeight;
    svgWidth = 700;
    svgHeight = 700;

    anime_data.forEach(d => {
        d.episodes = +d["episodes"]
        d.rating = +d["rating"]
        d.members = +d["members"]
    });

    
    // console.info('connection_data',connection_data)
    tags = tag_names.map((post, ind) => ({
        'name':post.genre_a
    }))


    tags_link = connection_data.map((ez, ind) => ({
        'source':ez.genre_a,
        'target':ez.genre_b,
        'count':ez.count,
    }))
    // console.info('testing',tags_link);

    links = tags_link;

    nodes = tags;


    

    drawChord();


};



function drawChord()
{

    let simulation1 = d3.forceSimulation()
    .nodes(nodes);

    let linkForce1 = d3.forceLink(links)
    .id(d => d.name);

    simulation1.force('links', linkForce1)
    .on('tick', updateLayout2);


    
    function updateLayout2() {}

   var line = d3.radialLine()
   .curve(d3.curveBundle.beta(0.85))
   .radius(function(d) { return d.y; })
   .angle(function(d) { return d.x / 180 * Math.PI; });

   
    let svgCircular = d3.select('#chordPlotSVG');
    let circularG = svgCircular.append('g')
                            .attr('transform', `translate(${svgWidth/2},${svgHeight/2})`)

    let radius = (svgHeight-60) / 2;

    // Calculate the positions of each node
    let polarScale = d3.scaleLinear()
                        .domain([0, nodes.length])
                        .range([0, 2 * Math.PI]);

    // Convert from polar to cartesian coordinates
        // x = r cos Θ
        //  y = r sin Θ
    nodes.forEach((d,i) => {
        let theta = polarScale(i);
        d.theta = theta;
        d.polarX = radius * Math.cos(theta);
        d.polarY = radius * Math.sin(theta)
    });

    // console.info('Nodes',nodes)
    // console.log('links',links)

    // Draw the nodes and links
    circularG.selectAll('.node')
                .data(nodes)
                .join('circle')
                // .classed('node', true)
                .style('fill', d => d.sex == 'F' ? 'khaki' : 'paleturquoise' )
                .attr('cx', d => d.polarX)
                .attr('cy', d => d.polarY)
                .attr('r', '15px')
                .attr('data', d => d.name)
                .attr("class", d => { return ` node n-${d.name}` } )

                .on('mouseover', function(d,i) {


                    // Get the tag of hovered node
                    let event = d3.event;
                    let currentTag = event.target.attributes.data.value;

                    let filteredAnime = []

                    anime_data.forEach(d => {

                        if ( d.genre.includes(currentTag) && !d.genre.includes('Hentai') ){
                            filteredAnime.push(d);
                        }

                    });

                    let top5Anime = filteredAnime.slice(0,5).sort((a, b) => d3.descending(+a.rating, +b.rating));
                    let bottom5Anime = filteredAnime.slice(filteredAnime.length-5,filteredAnime.length).sort((a, b) => d3.descending(+a.rating, +b.rating));

                    let top5AnimeNames = '';
                    let bottom5AnimeNames = '';
                    top5Anime.forEach(d => {

                        top5AnimeNames += ` ${d.name} - `


                    });
                    
                    bottom5Anime.forEach(d => {

                        bottom5AnimeNames += ` ${d.name} - `

                    });

                    // console.log('top5', top5Anime)
                    // console.log('bottom5', bottom5Anime)
                    // move tooltip to hovered nodes position

                    d3.select('#chordtooltip')
                        .style("left", (d3.event.pageX + 20) + "px")
                        .style("top", (d3.event.pageY - 25) + "px")
                        .style("opacity", '1');

                    // Set all non selected nodes to non low
                    circularG.selectAll(`.link`)
                        .style('stroke-opacity', '0.03')

                    // Set all selected nodes to medium
                    selectedTags.forEach((d,i) => {

                        // Set selected Node/Link to selected color
                        circularG.selectAll(`.${d}`)
                            .style('stroke-opacity', '0.45')
                            // .style('stroke-opacity', '0.75')
                    });

                    // console.info('current clicked tag', currentTag)
                    // Highlight all links that have hovered tag in it
                    circularG.selectAll(`.${currentTag}`)
                        .style('stroke-opacity', '1')

                    d3.select('#tooltip__title').text(`Top 5: ${top5AnimeNames} `);
                    d3.select('#tooltip__data').text(`Bottom 5: ${bottom5AnimeNames}`);
                })
                .on('mousemove', function(d,i) {

                    d3.select('#chordtooltip')
                    .style("left", (d3.event.pageX + 10) + "px")
                    .style("top", (d3.event.pageY - 10) + "px")

                })
                .on('mouseout', function(d,i) {

                    // if nothing is selected reset all back to default
                    if(selectedTags.length == 0){

                        circularG.selectAll(`.link`)
                            .style('stroke-opacity', '0.4')
                    }
                    else{

                        // set all Links to lowest opacity when currently selected tag
                        circularG.selectAll(`.link`)
                            .style('stroke-opacity', '0.1')

                        // Go through all selected nodes and highlight
                        selectedTags.forEach((d,i) => {

                            circularG.selectAll(`.${d}`)
                                .style('stroke-opacity', '1')
                        });
                    }

                    d3.select('#chordtooltip')
                        .style("opacity", '0')
    
                })
                .on('click', function(d,i) {
                    
                    let currentTag = d3.event.target.attributes.data.value



                    if ( d3.event.shiftKey ){ // multi-select

                        if ( selectedTags.includes(currentTag) ){ // selected again
                            let index = selectedTags.indexOf(currentTag);
                            selectedTags.splice(index,1);
                            // console.info('index', index)

                        }
                        else{
                            selectedTags.push(currentTag)
                        }

                    }
                    else { // single select

                        // if clicking on an already selected node and there are more then 1 selected then single newly clicked node
                        if ( selectedTags.length > 1 && selectedTags.includes(currentTag) ){
                            selectedTags = [currentTag];
                        }
                        else if ( selectedTags.length == 1 && selectedTags.includes(currentTag) ){
                            selectedTags = [];
                        }
                        else{

                            // if clicked again remove tag
                            // if new tag is clicked replace with new clicked tag
                            selectedTags = selectedTags.includes(currentTag) ? [] : [currentTag];

                        }


                        
                    }

                    // console.info(selectedTags)

                    // set all Nodes/Links to default color
                    circularG.selectAll(`.node`)
                        .style('fill', '#aeedee')

                    circularG.selectAll(`.link`)
                        .style('stroke-opacity', '0.03')


                    // Go through all selected nodes and highlight
                    selectedTags.forEach((d,i) => {

                        // Set selected Node/Link to selected color
                        circularG.selectAll(`.${d}`)
                            .style('stroke-opacity', '1')

                        circularG.selectAll(`.n-${d}`)
                            .style('fill', '#11abad')
                    });





                        
                        updatedCharts(selectedTags);
                })



    let maxRadius = 500;
    let maxLimit = 5.9;
    let minLimit = 0.5;
    circularG.selectAll('.node-label')
                .data(nodes)
                .join('text')
                .classed('node-label', true)
                .attr('x', d => d.polarX)
                .attr('y', d => d.polarY)
                .attr('data', d => d.name)
                .style('pointer-events', 'none')
                .text(d => d.name)
                
                
    circularG.selectAll('.link')
                .data(links)
                .join('line')
                // .classed('link', true)
                .attr("class", d => { return ` link ${d.source.name} ${d.target.name}` } )
                .attr('x1', d => { return d.source.polarX } )
                .attr('y1', d => d.source.polarY)
                .attr('x2', d => d.target.polarX)
                .attr('y2', d => d.target.polarY)
                .attr('d', line)
                .style('stroke-width', d => { return `${(d.count/maxRadius)*maxLimit + minLimit}px`})






    circularG.selectAll('.link').lower();

};

