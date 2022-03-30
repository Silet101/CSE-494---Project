// import chordInit from './chord.js'

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
       

        drawBarChart();
        drawChord();
        drawScatterPlot();
    });
});



function redrawAll(){
    
    drawBarChart();
    drawChord();
    drawScatterPlot();
}



// 
// 
// 
function drawScatterPlot(){

    console.log('scatter plot')
    // return([anime_data, connection_data])

}


// 
// 
// 
function drawChord(){

    console.log('chord')

    // return([anime_data, connection_data])

}



// 
// 
// 
function drawBarChart(){

    console.log('bar chart')

    // return([anime_data, connection_data])

}

