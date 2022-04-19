//Do not change these variables! They will be used by other modules
var lineWidth, lineHeight, lineInnerHeight, lineInnerWidth;
var lineMargin = { top: 50, right: 60, bottom: 60, left: 100 };

const inner_width = 50;
const outer_width = 150;
const bar_width = 0.5;

let bin = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

//Can modify this variable
var histogram_data;
function drawBarChart(data_subset)
{
    histogram_data = data_subset;
    histogram_data = anime_data;
    
    //Not sure what these will be just yet...
    let x_attribute = "rating";
    let y_attribute = "members";

    //We need to grab the selected data from the chord
    histogram_data.forEach(function(data)
    {
        bin[Math.floor(+data[x_attribute])] += +data[y_attribute];
    });

    let area = d3.select('.root')
                    .select('.container')
                    .select('.row')
                    .select('#histogram-area')
                    .select('.histogram')
                    .append('svg') 
                        .attr('width', '100%') //Will need to change these dimensions!
                        .attr('height', '100%');
    
    //Add g element to the div
    let histogram_area = area.append('g')
                        .attr('id', 'histogram-graph')
                        .attr('transform', `translate(170, 120)`); //Will probably need to change these as well!

    let yScale = d3.scaleRadial()
                        .domain([0, d3.max(bin)])
                        .range([inner_width, outer_width]); //Change this!


    //Get the scales setup for the histogram
    let xScale = d3.scaleBand()
                    .domain([-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
                    .align(0)
                    .range([0, 2 * Math.PI]);

    /*
    let xAxis = d3.axisBottom(xScale);
    let yAxis = d3.axisLeft(yScale)
                    .tickFormat(d3.format(".2s"));

    histogram_area.append('g').call(xAxis)
                                .attr('transform', `translate(0, 200)`)
                                .attr('id', 'x-axis');
    histogram_area.append('g').call(yAxis)
                                .attr('id', 'y-axis');

    */
    var index = -1;
    histogram_area.append('g').selectAll('path')
            .data(bin)
            .enter()
            .append('path')
                .attr('fill', "#69b3a2")
                .attr("d", d3.arc()
                    .innerRadius(50)
                    .outerRadius(function(d){ console.log(yScale(d)); return yScale(d); })
                    .startAngle(function(){ console.log(index); console.log(xScale(index)); return xScale(index); })
                    .endAngle(function(d, i) { return (xScale(index++) + bar_width);})
                    .padAngle(0.01)
                    .padRadius(50)
                );
}