var anime_data
var connection_data
document.addEventListener('DOMContentLoaded', () => {
    // Load both files before doing anything else
    Promise.all([d3.csv('data/anime.csv'),
                 d3.csv('data/preproccesed_final_connections.csv')])
                 .then(function(values){

        
        anime_data = values[0];
        connection_data = values[1];

        anime_data.forEach(d => {
            d.name = d["name"];
            d.episodes = +d["episodes"]
            d.rating = +d["rating"]
            d.members = +d["members"]
        });
       

        drawBarChart();
        // drawChord();
        drawPieChart();
        initialize_chart();
        drawScatterPlot();
    });
});
