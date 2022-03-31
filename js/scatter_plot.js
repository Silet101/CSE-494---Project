//Do not change these variables! They will be used by other modules
var scatterSvg;
var lineWidth, lineHeight, lineInnerHeight, lineInnerWidth;
var lineMargin = { top: 50, right: 60, bottom: 60, left: 100 };

//This variable can be modified
var scatter_data;

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

//     max_val = d3.max(school_data_state, function(d){
//         return d[attribute]
//     })

//     min_val = d3.min(school_data_state, function(d){
//     return d[attribute]
// })
//     x_scale = d3.scaleTime()
//     .domain([start_year,end_year])
//     .range([0, innerWidth]);

//     y_scale = d3.scaleLinear()
//     .domain([min_val,max_val])
//     .range([innerHeight - margin.bottom-margin.top , 0]);

    
}