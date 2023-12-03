const { MovieRepository } = require("../database");
const { FormateData } = require("../utils");

// All Business logic will be here
class MovieService {

    constructor(){
        this.repository = new MovieRepository();
    }
    

    async CreateMovie(movieInputs){

        const movieResult = await this.repository.CreateMovie(movieInputs)
        return FormateData(movieResult);
    }
    
    async GetMovies(){
        const movies = await this.repository.Movies();

        let categories = {};

        movies.map(({ genre }) => {
            categories[genre] = genre;
        });
        
        return FormateData({
            movies,
            categories:  Object.keys(categories)  
           })

    }

    async GetMovieDescription(movieId){
        
        const movie = await this.repository.FindById(movieId);
        return FormateData(movie)
    }

    async GetMoviesByCategory(category){

        const movies = await this.repository.FindByCategory(category);
        return FormateData(movies)

    }

    async GetSelectedMovies(selectedIds){
        
        const movies = await this.repository.FindSelectedMovies(selectedIds);
        return FormateData(movies);
    }

    async GetMoviePayload(userId,{ movieId, qty },event){

         const movie = await this.repository.FindById(movieId);

        if(movie){
             const payload = { 
                event: event,
                data: { userId, movie, qty}
            };
 
             return FormateData(payload)
        }else{
            return FormateData({error: 'No movie Available'});
        }

    }
 

}

module.exports = MovieService;
