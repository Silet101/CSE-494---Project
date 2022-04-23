var anime_data
var connection_data
var genre_list
var tag_names

document.addEventListener('DOMContentLoaded', () => {
    // Load both files before doing anything else
    Promise.all([d3.csv('data/anime.csv'),
                 d3.csv('data/preproccesed_final_connections.csv'),
                 d3.csv('data/list_of_all_genres.csv')
                ])
                 .then(function(values){

        
        anime_data = values[0];
        connection_data = values[1];
        genre_list = values[2];
        tag_names = values[2];

        anime_data.forEach(d => {
            d.name = d["name"];
            d.episodes = +d["episodes"]
            d.rating = +d["rating"]
            d.members = +d["members"]
        });

        connection_data.forEach(d => {
            d.genre_a = d['genre_a'];
            d.genre_b = d['genre_b'];
            d.count = +d['count'];
        });

        genre_list.forEach(d => {
            d.genre = d['genre_a'];
        });
   
       

        drawBarChart();
        init_chord();
        drawPieChart(anime_data);
        initialize_chart();
        drawScatterPlot(anime_data);
    });
});
