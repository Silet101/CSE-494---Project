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
            d.genre = d["genre"];
        });

        connection_data.forEach(d => {
            d.genre_a = d['genre_a'];
            d.genre_b = d['genre_b'];
            d.count = +d['count'];
        });

        genre_list.forEach(d => {
            d.genre = d['genre_a'];
        });
   

        //System to filer the chord data
        let chord_chart_genre = "unselected";
        let genre_selection = anime_data.filter(function(data)
        { 
            if(chord_chart_genre != "unselected")
            {
                return(data.genre.includes(chord_chart_genre)); 
            }

            return true;
        });
       

        drawBarChart();
        init_chord();
        drawPieChart(genre_selection);
        initialize_chart();
        drawScatterPlot(genre_selection);
    });
});


function updatedCharts(selectedTag='unselected')
{
    let filteredAnime = [];
    anime_data.forEach((d,i) => {
        if (d.genre.includes(selectedTag)){

            filteredAnime.push(d);
        }
            
    });


    console.info('sdsd', filteredAnime)
    if (selectedTag=='unselected'){
        initialize_chart();
        drawScatterPlot(anime_data);
    }
    else{










        initialize_chart();
        drawScatterPlot(anime_data);
    }
}