//Do not change these variables! They will be used by other modules
var svgWidth;
var svgHeight;
var svgSimple;

var tags;
var tags_link;

var lineWidth, lineHeight, lineInnerHeight, lineInnerWidth;
var lineMargin = { top: 50, right: 60, bottom: 60, left: 100 };

            let nodes = [
                            { name: 'Leslie', sex: 'F' },
                            { name: 'Ron', sex: 'M' },
                            { name: 'Andy', sex: 'M' },
                            { name: 'April', sex: 'F' },
                            { name: 'Ben', sex: 'M' },
                            { name: 'Tom', sex: 'M' },
                            { name: 'Chris', sex: 'M' },
                            { name: 'Ann', sex: 'F' },
                            { name: 'Donna', sex: 'F' },
                            { name: 'Jerry', sex: 'M' }
                        ];


            // let nodes = [
            //                 { name: 'Drama', sex: 'F' },
            //                 { name: 'Romance', sex: 'M' },
            //                 { name: 'School', sex: 'M' },
            //                 { name: 'Supernatural', sex: 'F' },
            //                 { name: 'Magic', sex: 'M' },
            //                 { name: 'Military', sex: 'M' },
            //                 { name: 'Shounen', sex: 'M' },
            //                 { name: 'Fantasy', sex: 'F' },
            //                 { name: 'Historical', sex: 'F' },
            //                 { name: 'Parody', sex: 'M' }
            //             ];

            let links = [
                            { source: 'Leslie', target: 'Ron' },
                            { source: 'Leslie', target: 'Ben' },
                            { source: 'Leslie', target: 'Ann' },
                            { source: 'Ron', target: 'Chris' },
                            { source: 'Ron', target: 'Donna' },
                            { source: 'Ron', target: 'April' },
                            { source: 'Ron', target: 'Jerry' },
                            { source: 'Andy', target: 'April' },
                            { source: 'Andy', target: 'Ann' },
                            { source: 'Ben', target: 'Chris' },
                            { source: 'Tom', target: 'Ann' },
                            { source: 'Tom', target: 'Donna' },
                            { source: 'Chris', target: 'Ann' }
                        ];

//Can modify this variable
var chord_data;

function init_chord(){

    svgSimple = d3.select('#chordPlotSVG');
    // svgWidth = svgSimple.node().clientWidth;
    // svgHeight = svgSimple.node().clientHeight;
    svgWidth = 600;
    svgHeight = 500;

    anime_data.forEach(d => {
        d.episodes = +d["episodes"]
        d.rating = +d["rating"]
        d.members = +d["members"]
    });

    

    tags = tag_names.map((post, ind) => ({
        'name':post.genre_a
    }))


    tags_link = connection_data.map((post, ind) => ({
        'source':post.genre_a,
        'target':post.genre_b,
    }))
    console.log('testing',tags_link);

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

    console.log(nodes)
    console.log('links',links)

    // Draw the nodes and links
    circularG.selectAll('.node')
                .data(nodes)
                .join('circle')
                .classed('node', true)
                .style('fill', d => d.sex == 'F' ? 'khaki' : 'paleturquoise' )
                .attr('cx', d => d.polarX)
                .attr('cy', d => d.polarY)
                .attr('r', 5); 



    circularG.selectAll('.node-label')
                .data(nodes)
                .join('text')
                .classed('node-label', true)
                .attr('x', d => d.polarX)
                .attr('y', d => d.polarY)
                .text(d => d.name);
                
                
    circularG.selectAll('.link')
                .data(links)
                .join('line')
                .classed('link', true)
                .attr('x1', d => d.source.polarX)
                .attr('y1', d => d.source.polarY)
                .attr('x2', d => d.target.polarX)
                .attr('y2', d => d.target.polarY)
                .attr('d', line); 



    circularG.selectAll('.link').lower();

};