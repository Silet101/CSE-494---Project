function drawRadialBarPlot()
{
    //First, we need to categorize the data in proper bins...
    anime_data;
    genre_list;

    //Initialize the genre map
    genre_map = new Map(genre_list.map(data => [data.genre, 0]));

    //Set the values for genre_map
    anime_data.forEach(function(data){
        let list = data.genre.split(',');
        list.forEach(function(genre){
            let val = genre_map.get(genre.replace(/\s/g, ""));
            val += 1;
            genre_map.set(genre.replace(/\s/g, ""), val);
        });
    });

    let list = Array.from(genre_list, d => d.genre);

    const y_axis = d3.scaleLinear()
                        .domain([0, 10])
                        .range([0, 0.5]);
    const x_axis = d3.scaleBand()
                        .domain(list)
                        .range([0, 360])
                        .paddingInner(0.2)
                        .paddingOuter(0);
    
    //We need to select the area that contains the chord chart
    //or when test, another part of the graph

    let area = d3.select('.root')
        .select('.container')
        .select('.row')
        .select('.spacer')
        .select('#chord-area')
        .select('#chordPlotSVG');

    area.selectAll('rect')
                    .data(list)
                    .enter()
                    .append('rect')
                    .attr('x', -8) //Rotates the bars
                    .attr('y', 485) //Radius of circle
                    .attr('width', 10) 
                    .attr('height', (d) => y_axis(genre_map.get(d)))
                    .style('transform', (d) => `translate(500px, 500px)rotate(${x_axis(d) + 11}deg)`) //Translate moves the circle!
                    .attr('id', (d) => d)
                    .attr('fill', 'steelblue');


}