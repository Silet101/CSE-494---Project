//Do not change these variables! They will be used by other modules
var svgWidth;
var svgHeight;
var svgSimple;

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


//Can modify this variable
var chord_data;

function init_chord(){

    svgSimple = d3.select('#svg-circular');
    svgWidth = svgSimple.node().clientWidth;
    svgHeight = svgSimple.node().clientHeight;

};

function drawChord()
{
    let svgCircular = d3.select('#svg-circular');
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

    // Draw the nodes and links
    circularG.selectAll('.node')
                .data(nodes)
                .join('circle')
                .classed('node', true)
                .style('fill', d => d.sex == 'F' ? 'khaki' : 'paleturquoise' )
                .attr('cx', d => d.polarX)
                .attr('cy', d => d.polarY)
                .attr('r', 20);
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
                .attr('y2', d => d.target.polarY);


    circularG.selectAll('.link').lower();

};

