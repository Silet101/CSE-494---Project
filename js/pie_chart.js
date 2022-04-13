//Do not change these variables! They will be used by other modules
var lineWidth, lineHeight, lineInnerHeight, lineInnerWidth;
var lineMargin = { top: 50, right: 60, bottom: 60, left: 100 };

//Can modify this variable
var pie_chart_data;
/*var anime_data
var connection_data
var genre_list*/


//Pie chart will require a subset of data to be passed in order for it to work properly
function drawPieChart(dataset)
{
    //Will need to change this to the tool tip area
    let area = d3.select('.root')
    .select('.container')
    .select('.row')
    .select('.piechart-area')
    .select('.piechart')
    .append('svg') 
        .attr('width', '100%') //Will need to change these dimensions!
        .attr('height', '100%');

    let subset_data = dataset

    let category_data = [{type:"Movie", number: 0},
                            {type:"TV", number: 0}, 
                            {type:"OVA", number: 0}, 
                            {type:"Special", number: 0}, 
                            {type:"Music", number: 0}, 
                            {type:"ONA", number: 0},
                            {type:"Other", numver: 0}];

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

        else
            category_data[6].number++;

    });

    var color = d3.scaleOrdinal()
                    .domain(category_data)
                    .range(['#ffd384','#94ebcd','#fbaccc','#d3e0ea','#fa7f72', '#ffdfd3']);

    var pie = d3.pie()
                .value(d => d.number);

    var arc = d3.arc()
                    .innerRadius(0)
                    .outerRadius(100)
    const arcs = pie(category_data);
    
    area.append('g')
        .attr('stroke', 'white')
        .selectAll('path')
        .data(arcs)
        .enter().append('path')
        .attr('fill', d => color(d.value))
        .attr("d", arc)
        .attr('transform', 'translate(360, 120)');
}