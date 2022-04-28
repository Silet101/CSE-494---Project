//Do not change these variables! They will be used by other modules
var lineWidth, lineHeight, lineInnerHeight, lineInnerWidth;
var lineMargin = { top: 50, right: 60, bottom: 60, left: 100 };

//Can modify this variable
var pie_chart_data;

var area;
/*var anime_data
var connection_data
var genre_list*/

function initPieChart(){
    //Will need to change this to the tool tip area
    area = d3.select('#piePlotSVG') 
        .attr('width', '300px') //Will need to change these dimensions!
        .attr('height', '300px')
        .attr('transform', 'translate(155, 250)');

    let pie_loc = area.append('g')
    area.append('text')
                    .text('Media Type Distribution')
                    .attr('x', -85)
                    .attr('y', -240)
                    .attr('dy', '20px')
                    .attr('font-weight', 1000);
}  


//Pie chart will require a subset of data to be passed in order for it to work properly
function drawPieChart(dataset)
{


    let subset_data = dataset

    //console.info('pie data', subset_data)

    let category_data = [{type:"Movie", number: 0},
                            {type:"TV", number: 0}, 
                            {type:"OVA", number: 0}, 
                            {type:"Special", number: 0}, 
                            {type:"Music", number: 0}, 
                            {type:"ONA", number: 0}];

    subset_data.forEach(function(d)
    {
        if(d.type.includes("Movie"))
            category_data[0].number++;

        else if(d.type.includes("TV"))
            category_data[1].number++;

        else if(d.type.includes("OVA"))
            category_data[2].number++;

        else if(d.type.includes("Special"))
            category_data[3].number++;

        else if(d.type.includes("Music"))
            category_data[4].number++;

        else if(d.type.includes("ONA"))
            category_data[5].number++;
    });

    var color = d3.scaleOrdinal()
                    .domain(category_data)
                    .range(['#003f5c','#444e86','#955196','#dd5182','#ff6e54', '#ffa600']);

    var pie = d3.pie()
                .value(d => d.number);

    var arc = d3.arc()
                    .innerRadius(0)
                    .outerRadius(200)

    var pie_labels = d3.arc()
                        .innerRadius(50)
                        .outerRadius(200);
        
    
    const arcs = pie(category_data);

    
        
        
    
    area.select('g')
            .attr('stroke', 'black')
            .selectAll('path')
            .data(arcs)
            // .enter().append('path')
            .join('path')
            .attr('fill', d => color(d.data.type))
            .attr("d", arc)
            .on('mouseover', function(d,i) {

                // console.info('hover',d.data);
                // when entering pie chart update tooltip location relative to mouse
                d3.select('#pietooltip')
                    .style("left", (d3.event.pageX + 20) + "px")
                    .style("top", (d3.event.pageY - 25) + "px")
                    .style("opacity", '1');

                d3.select('#tooltip_pie__title').text(`Type: ${d.data.type} `);
                d3.select('#tooltip_pie__data').text(`Value: ${d.data.number}`);
            })
            .on('mousemove', function(d,i) {

                // when moves update tooltip location relative to mouse
                d3.select('#pietooltip')
                    .style("left", (d3.event.pageX + 20) + "px")
                    .style("top", (d3.event.pageY - 25) + "px")
                    

            })
            .on('mouseout', function(d,i) {

                // when mouse leaves the pie chart hide tooltip
                d3.select('#pietooltip')
                    .style("opacity", '0')

            });
                            
    
    area.select('g').selectAll('text')
                    .data(arcs)
                    .join('text')
                    // .append('text')
                    .text(function(d){ return d.data.type})
                    .attr('transform', function(d){return `translate(${pie_labels.centroid(d)}) rotate(35)`})
                    .style('text-anchor', 'middle')
                    .style('pointer-events', 'none')
                    // .attr('transform', 'rotate(1)')
                    .style('font-size', 17);
}