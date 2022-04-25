//Do not change these variables! They will be used by other modules
var lineWidth, lineHeight, lineInnerHeight, lineInnerWidth;
var lineMargin = { top: 50, right: 60, bottom: 60, left: 100 };

let bin = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

//Can modify this variable
var histogram_data;
function drawBarChart(dataset)
{
    histogram_data = dataset;
    histogram_data = anime_data;
    
    let x_attribute = "rating";
    let y_attribute = "members";

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
                        .attr('width', 800) //Will need to change these dimensions!
                        .attr('height', 500);
    
    //Add g element to the div
    let histogram_area = area.append('g')
                        .attr('id', 'histogram-graph')
                        .attr('transform', `translate(80, 10)`);


    //Get the scales setup for the histogram
    let xScale = d3.scaleLinear()
                    .domain([-1.1, d3.max(histogram_data.map(function(data){ return data[x_attribute]}))])
                    .range([0, 550]); //Change this!

    let yScale = d3.scaleLinear()
                    .domain([Math.max(...bin), 0])
                    .range([0, 420]); //Change this!

    let xAxis = d3.axisBottom(xScale)
                   
    let yAxis = d3.axisLeft(yScale)
                    .tickFormat(d3.format(".2s"));

    histogram_area.append('g').call(xAxis)
                                .attr('transform', `translate(0, 420)`)
                                .attr('class', 'axis');
    histogram_area.append('g').call(yAxis)
                                .attr('class', 'axis');

    for(var i = 0; i < 12; i++)
    {
        histogram_area.append('rect')
                        .attr('id', 'bar')
                        .attr('y', yScale(bin[i]))
                        .attr('height', yScale(0) - yScale(bin[i]))
                        .attr('width', 5) //Will probably change later
                        .attr('transform', `translate(${xScale((i - 1)) - 2},0)`);
    }

    histogram_area.append('text')
                    .text('Ratings')
                    .attr('x', 280)
                    .attr('y', 450)
                    .attr('dy', '15px');


    histogram_area.append('text')
                    .text('Members')
                    .attr('x', -230)
                    .attr('y', -60)
                    .attr('transform', 'rotate(-90)')
                    .attr('dy', '15px');
    
}