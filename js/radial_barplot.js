function drawRadialBarPlot()
{
    //First, we need to categorize the data in proper bins...
    anime_data;
    genre_list;

    let angles = [-90.5, -82, -73.3, -64.8, -56.4, -47.9378, -39.3254, -30.7129, -22.1005, -13.488, -4.8756, 3.73684, 12.3493, 20.9617, 
        29.4, 38.0, 46.6, 55.1, 63.8, 72.4, 80.8, 89.5, 98.0, 106.5, 115.2, 123.8, 132.5, 141.2, 149.7, 158.3, 167.0, 175.1, 184.0, 193.0, 
        201.8, 210.2, 218.4, 227.0, 235.5, 243.885, 252.498, 261.11];

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
        .select('#chordPlotSVG')
        .append('g');

    area.selectAll('rect')
                    .data(list)
                    .enter()
                    .append('rect')
                    .attr('x', -8) //Rotates the bars
                    .attr('y', 335) //Radius of circle
                    .attr('width', 10) 
                    .attr('height', (d) => y_axis(genre_map.get(d)))
                    .style('transform', (d, i) => `translate(350px, 350px)rotate(${angles[i]}deg)`) //Translate moves the circle!
                    .attr('id', (d) => d)
                    .attr('fill', 'steelblue');

}