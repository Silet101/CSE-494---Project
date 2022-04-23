//Do not change these variables! They will be used by other modules
var svgWidth;
var svgHeight;
var svgSimple;

var tags;
var tags_link;

var selectedTag = '';

var lineWidth, lineHeight, lineInnerHeight, lineInnerWidth;
var lineMargin = { top: 50, right: 60, bottom: 60, left: 100 };

let nodes = [];


let links = [];

//Can modify this variable
var chord_data;

function init_chord(){

    d3.select('#chordtooltip').style("opacity", '0');

    svgSimple = d3.select('#chordPlotSVG');
    // svgWidth = svgSimple.node().clientWidth;
    // svgHeight = svgSimple.node().clientHeight;
    svgWidth = 1000;
    svgHeight = 1000;

    anime_data.forEach(d => {
        d.episodes = +d["episodes"]
        d.rating = +d["rating"]
        d.members = +d["members"]
    });

    
    console.info('connection_data',connection_data)
    tags = tag_names.map((post, ind) => ({
        'name':post.genre_a
    }))


    tags_link = connection_data.map((ez, ind) => ({
        'source':ez.genre_a,
        'target':ez.genre_b,
        'count':ez.count,
    }))
    console.info('testing',tags_link);

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


    
    function updateLayout2() {

   }

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

    console.info('Nodes',nodes)
    console.log('links',links)

    // Draw the nodes and links
    circularG.selectAll('.node')
                .data(nodes)
                .join('circle')
                .classed('node', true)
                .style('fill', d => d.sex == 'F' ? 'khaki' : 'paleturquoise' )
                .attr('cx', d => d.polarX)
                .attr('cy', d => d.polarY)
                .attr('r', '15px')
                .attr('data', d => d.name)
                .on('mouseover', function(d,i) {


                    // Get the tag of hovered node
                    let event = d3.event
                    let currentTag = event.target.attributes.data.value

                    // move tooltip to hovered nodes position
                    d3.select('#chordtooltip')
                        .style("left", (d.pageX + 20) + "px")
                        .style("top", (d.pageY - 25) + "px")
                        .style("opacity", '1');

                    circularG.selectAll(`.link`)
                    // .style('stroke-width', '1px')
                        .style('stroke-opacity', '0.1')

                    // Highlight all links that have hovered tag in it
                    circularG.selectAll(`.${currentTag}`)
                        // .style('stroke-width', '3px')
                        .style('stroke-opacity', '1')
    
                    d3.select('#tooltip__title').text(`Tag: ${currentTag} `);
                    d3.select('#tooltip__data').text(`Some random stats`);
                })
                .on('mousemove', function(d,i) {

                    d3.select('#chordtooltip')
                    .style("left", (d.pageX + 10) + "px")
                    .style("top", (d.pageY - 10) + "px")

                })
                .on('mouseout', function(d,i) {

    
                    // g.select(`#${sName}_state`).attr('stroke-width', '1px');
                    circularG.selectAll(`.link`)
                    // .style('stroke-width', '1px')
                    .style('stroke-opacity', '0.4')

                    d3.select('#chordtooltip')
                    .style("opacity", '0')
    
                })
                .on('click', function(d,i) {
                    
                    let currentTag = d.target.attributes.data.value

                    circularG.selectAll(`.link`)
                        // .style('stroke-width', '1px')
                        .style('stroke-opacity', '0.1')

                    circularG.selectAll(`.${currentTag}`)
                        // .style('stroke-width', '3px')
                        .style('stroke-opacity', '1')

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

