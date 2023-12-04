const mongoose = require('mongoose');
const { MovieModel } = require("../models");

//Dealing with data base operations
class MovieRepository {


    async CreateMovie({ title, genre, releaseYear, director, plot, rating, reviews, unit, price , available }){

        const movie = new MovieModel({
            title, genre, releaseYear, director, plot, rating, reviews, unit, price , available
        })

        const movieResult = await movie.save();
        return movieResult;
    }


     async Movies(){
        return await MovieModel.find();
    }
   
    async FindById(id){
        
       return await MovieModel.findById(id);

    }

    async FindByCategory(category){

        const movies = await MovieModel.find({ type: category});

        return movies;
    }

    async FindSelectedProducts(selectedIds){
        const movies = await MovieModel.find().where('_id').in(selectedIds.map(_id => _id)).exec();
        return movies;
    }
    
}

module.exports = MovieRepository;
