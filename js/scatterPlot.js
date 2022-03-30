import {get_data} from "./main.js"
var scatterSvg;
var lineWidth, lineHeight, lineInnerHeight, lineInnerWidth;
var lineMargin = { top: 50, right: 60, bottom: 60, left: 100 };
var data_scatter = get_data()[0]

function scatterPlotInit()
{
    scatterSvg = d3.select('#scatterPlotSVG');
    scatterSvg.selectAll('*').remove();
    console.log(data_scatter)

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