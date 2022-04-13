//Do not change these variables! They will be used by other modules
var lineWidth, lineHeight, lineInnerHeight, lineInnerWidth;
var lineMargin = { top: 50, right: 60, bottom: 60, left: 100 };

//Can modify this variable
var histogram_data;
function drawBarChart()
{
    histogram_data = anime_data;
    
    //We need to grab the selected data from the chord

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
                        .attr('transform', `translate(65, 20)`); //Will probably need to change these as well!


    //Not sure what these will be just yet...
    let x_attribute = "rating";
    let y_attribute = "members";


    //Get the scales setup for the histogram
    let xScale = d3.scaleLinear()
                    .domain([-1.1, 10])
                    .range([0, 550]); //Change this!

    let yScale = d3.scaleLinear()
                    .domain([d3.max(histogram_data.map(function(data){ return data[y_attribute]})), 0])
                    .range([0, 200]); //Change this!

    let xAxis = d3.axisBottom(xScale);
    let yAxis = d3.axisLeft(yScale);

    histogram_area.append('g').call(xAxis)
                                .attr('transform', `translate(0, 200)`);
    histogram_area.append('g').call(yAxis);

    histogram_data.forEach(function(data)
    {
        histogram_area.append('rect')
                        .attr('class', 'bar')
                        .attr('height', yScale(0) - yScale(+data[y_attribute]))
                        .attr('width', 5) //Will probably change later
                        .attr('x', xScale(+data[x_attribute]) - 2)
                        .attr('y', yScale(+data[y_attribute]))
    });
}