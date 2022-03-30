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
            d.Year = +d["episodes"]
            d["rating"] = +d["rating"]
            d["members"] = +d["members"]
        });
        console.log(schoolData)
        tooltip = d3.select('#tooltip').style("opacity", 0)
       
    });
});
function get_data(){

    return [anime_data, connection_data]

}
function main()
{
    
}