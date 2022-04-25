//Do not change these variables! They will be used by other modules
var scatterSvg;
var lineWidth, lineHeight, innerHeight, innerWidth;
var margin = { top: 25, right: 100, bottom: 75, left: 100 };

//This variable can be modified
var scatter_data;
var yaxis_label
var xaxis_label
var xAxis_g
var yAxis_g

function drawScatterPlot(data)
{
    //It's important to set scatter data to the anime data here in the function
    //since the anime_data variable is initialized once the DOM content
    //is completely loaded.
    scatter_data = data;
    console.log('draw scatter plot call success!');
    scatterSvg = d3.select('#scatterPlotSVG');
    scatterSvg.selectAll('*').remove();
    initialize_chart()
    console.log(scatter_data);
    attribute_x = d3.select('#x-ScatterPlot').property('value')
    attribute_y = d3.select('#y-ScatterPlot').property('value')
    attribute_r = d3.select('#r-ScatterPlot').property('value')
    lineWidth = +scatterSvg.style('width').replace('px','');
    lineHeight = +scatterSvg.style('height').replace('px','');;
    innerWidth = lineWidth - margin.left - margin.right;
    innerHeight = lineHeight - margin.top - margin.bottom;

    console.log(attribute_x,attribute_y,attribute_r)

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

    max_val_size = d3.max(scatter_data, function(d){
        return d[attribute_r]
    })

    offset = 0.075
    net_diff_x = (max_val_x-min_val_x)*offset
    net_diff_y = (max_val_y-min_val_y)*offset

    min_domain_x = min_val_x - net_diff_x
    if( min_val_x - net_diff_x < 0){

        min_domain_x = 0

    }
    min_domain_y = min_val_y - net_diff_y
    if( min_val_y - net_diff_y < 0){

        min_domain_y = 0

    }

    x_scale = d3.scaleLinear()
    .domain([min_domain_x,max_val_x + net_diff_x])
    .range([0, innerWidth]);

    y_scale = d3.scaleLinear()
    .domain([min_val_y - net_diff_y ,max_val_y + net_diff_y])
    .range([innerHeight-margin.top, 0]);
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

    xaxis_label.text(attribute_x)
    yaxis_label.text(attribute_y)

    scatterSvg.selectAll('circle')
        .data(scatter_data, d => d.name)
      .join( enter => enter.append('circle')
            .attr('cx', d => x_scale(d[attribute_x]) + margin.left)
            .attr('cy', d => y_scale(d[attribute_y]) + margin.top)
            .attr('id', d => `id_${d.anime_id}`)
            .attr("fill", 'pink')
            .attr("opacity",0.6)
            .attr('stroke', 'black')
            .attr("r",0)
            .transition()
            .duration(750) //Applied transition to circles instead of entire svg
            .attr("r", d => ((+d[attribute_r]/max_val_size*16)+2))
            .selection()
            ,
      
        update => update.attr("fill", 'pink')
                    .call(update => update.transition().duration(1000)
                    .transition()
                    .duration(750)
                    .attr('cx', d=> x_scale(d[attribute_x]) + margin.left)
                    .attr('cy', d=> y_scale(d[attribute_y]) + margin.top)
                    .attr("r", d => (d[attribute_r]/max_val_size*27)+3)
                    )
        ,
        exit => exit.style('fill','red')
                    .call(exit => exit.transition()
                            .attr('r',0)
                            .remove()) 
      )

    scatterSvg.selectAll("circle")
      .data(scatter_data)
      .on('mouseover', function(d,i) {
        current_selection = d3.select(`#id_${d.anime_id}`)
        current_selection.attr('stroke-width', 3)
        tooltip = d3.select('#scattertooltip').style("opacity", 1)
        tooltip.html(`Name: ${d.name} <br> ${attribute_x}: ${d[attribute_x]}
        <br>${attribute_y}: ${d[attribute_y]} <br> ${attribute_r}: ${d[attribute_r]}`)
            .style("left", (d3.event.pageX + 20) + "px")
            .style("top", (d3.event.pageY - 25) + "px");

    })
    .on('mousemove', function(d,i) {
        current_selection = d3.select(`#id_${d.anime_id}`)
        current_selection.attr('stroke-width', 3)
        tooltip = d3.select('#scattertooltip').style("opacity", 1)
        tooltip.html(`Name: ${d.name} <br> ${attribute_x}: ${d[attribute_x]}
        <br>${attribute_y}: ${d[attribute_y]} <br> ${attribute_r}: ${d[attribute_r]}`)
            .style("left", (d3.event.pageX + 20) + "px")
            .style("top", (d3.event.pageY - 25) + "px");
    })
    .on('mouseout', function(d,i) {
        current_selection = d3.select(`#id_${d.anime_id}`)
        current_selection.attr('stroke-width', 1)
        d3.select('#scattertooltip').style("opacity", 0)
    });
}
function initialize_chart(){

    scatterSvg = d3.select('#scatterPlotSVG');
    scatterSvg.selectAll('*').remove();
    lineWidth = +scatterSvg.style('width').replace('px','');
    lineHeight = +scatterSvg.style('height').replace('px','');;
    innerWidth = lineWidth - margin.left - margin.right;
    innerHeight = lineHeight - margin.top - margin.bottom;

    x_scale = d3.scaleLinear()
        .domain([0,10])
        .range([0, innerWidth]);

    y_scale = d3.scaleLinear()
        .domain([0,10])
        .range([innerHeight-margin.top, 0]);

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