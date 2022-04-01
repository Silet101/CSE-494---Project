//Do not change these variables! They will be used by other modules
var scatterSvg;
var lineWidth, lineHeight, lineInnerHeight, lineInnerWidth;
var margin = { top: 50, right: 60, bottom: 60, left: 100 };

//This variable can be modified
var scatter_data;
var yaxis_label
var xaxis_label
var xAxis_g
var yAxis_g

function drawScatterPlot()
{
    //It's important to set scatter data to the anime data here in the function
    //since the anime_data variable is initialized once the DOM content
    //is completely loaded.
    scatter_data = anime_data;
    console.log('draw scatter plot call success!');
    scatterSvg = d3.select('#scatterPlotSVG');
    scatterSvg.selectAll('*').remove();
    console.log(scatter_data);
    attribute_x = d3.select('#x-ScatterPlot').property('value')
    attribute_y = d3.select('#y-ScatterPlot').property('value')
    attribute_r = d3.select('#r-ScatterPlot').property('value')
    lineWidth = +scatterSvg.style('width').replace('px','');
    lineHeight = +scatterSvg.style('height').replace('px','');;
    innerWidth = lineWidth - margin.left - margin.right;
    innerHeight = lineHeight - margin.top - margin.bottom;

    max_val_x = d3.max(scatter_data, function(d){
        return d[attribute_x]
    })
    min_val_x = d3.min(scatter_data, function(d){
        return d[attribute_x]
    })

    max_val_y = d3.max(scatter_data, function(d){
        return d[attribute_y]
    })
    min_val_y = d3.min(scatter_data, function(d){
        return d[attribute_y]
    })

    x_scale = d3.scaleLinear()
    .domain([min_val_x,max_val_x])
    .range([0, innerWidth]);

    y_scale = d3.scaleLinear()
    .domain([min_val_y,max_val_y])
    .range([innerHeight - margin.bottom-margin.top , 0]);

    const yAxis = d3.axisLeft(y_scale);
    yAxis_g
        .transition()
        .duration(750)
        .call(yAxis)

    const xAxis = d3.axisBottom(x_scale);
    xAxis_g
        .transition()
        .duration(750)
        .call(xAxis)

    
}
function initialize_chart(){

    scatterSvg = d3.select('#scatterPlotSVG');
    scatterSvg.selectAll('*').remove();
    x_scale = d3.scaleLinear()
            .domain([0,10])
            .range([0, innerWidth]);

     y_scale = d3.scaleLinear()
         .domain([0,10])
         .range([margin.top + innerHeight, 0]);


    const g = scatterSvg

    const yAxis = d3.axisLeft(y_scale);
    yAxis_g = g.append('g')
        .attr('transform', 'translate('+margin.left+', '+margin.top+')')
    yAxis_g.call(yAxis) 

    const xAxis = d3.axisBottom(x_scale);
    xAxis_g = g.append('g')
        .attr('transform','translate('+margin.left+','+innerHeight+')')        
    xAxis_g.call(xAxis)

    yaxis_label = g.append('text')
        .attr('class','axis-label')
        .attr('transform','rotate(-90)')
        .attr('y',margin.left/4)
        .attr('x',-innerHeight/2)
        .attr('text-anchor','middle')
    xaxis_label = g.append('text')
        .attr('class','axis-label')
        .attr('text-anchor','middle')
        .attr('x',innerWidth/2)
        .attr('y',innerHeight+margin.bottom)
}