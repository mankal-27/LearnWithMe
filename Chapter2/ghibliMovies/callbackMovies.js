const request = require('request');
const fs = require('fs');

request('https://ghibliapi.herokuapp.com/films', (error, response, body) => {
    if(error){
        console.error(`Could not send request to API: ${error.message}`);
        return;
    }

    if(response.statusCode != 200){
        console.error(`Expected status code 200 but received ${response.statusCode}.`);
        return;
    }

    console.log(`Processing our list of movies`);
    movies = JSON.parse(body);
    console.log('------------------------------',movies.length)
    let moviesList = '';
    movies.forEach(movie => {
        moviesList += `${movie['title']}, ${movie['release_date']}\n`
    });

    fs.writeFile(`callbackMovies.csv`, moviesList, (error) => {
        if(error){
            console.error(`Could not save the ghinli movies to file: ${error}`);
            return;
        }
        console.log('Saved out list of movies to callbackmovies.csv')
    });
});


