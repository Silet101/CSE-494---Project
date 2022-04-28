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
   
        initPieChart();
        drawPieChart(anime_data);
        drawBarChart(anime_data);
        
        drawScatterPlot(anime_data);
        drawRadialBarPlot();
        init_chord();
    });
});


function doesTagExist(filteringTags, animeTagString){

    let hitCounter = 0;
    // console.info('animeTagString', animeTagString)
    // console.info('filteringTags', filteringTags)

    // itterate through tag list
    filteringTags.forEach((d,i) => {
        if (animeTagString.replace(/\s/g, "").includes(d)){
            hitCounter++;
        }
    });

    // if all tags were hit send back true
    return hitCounter == filteringTags.length?  true : false;
}



function updatedCharts(selectedTag=selectedTags){
    console.info (selectedTag)
    let genre_selection = anime_data.filter(function(data){ 
        if( selectedTag.length != 0 ){
            return( doesTagExist(filteringTags=selectedTag, animeTagString=data.genre) );//data.genre.replace(/\s/g, "").includes(selectedTag)); 
        }

        return true;
    });


    drawScatterPlot(genre_selection);
    drawBarChart(genre_selection);
    drawPieChart(genre_selection);

}


