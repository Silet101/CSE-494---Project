//Do not change these variables! They will be used by other modules
var lineWidth, lineHeight, lineInnerHeight, lineInnerWidth;
var lineMargin = { top: 50, right: 60, bottom: 60, left: 100 };

//Can modify this variable
var pie_chart_data;

function drawPieChart()
{
    pie_chart_data = anime_data;
    
    let area = d3.select('.root')
    .select('.container')
    .select('.row')
    .select('#histogram-area')
    .select('.histogram')
    .append('svg') 
        .attr('width', '100%') //Will need to change these dimensions!
        .attr('height', '100%');

    let attribute = 'episodes';
    let attribute_total = d3.sum(pie_chart_data.map(function(data){return data[attribute]}));

    pie_chart_data.forEach(function(data)
    {
        //console.log(data.name);
        //console.log(data[attribute] / attribute_total + "%");
    });
}