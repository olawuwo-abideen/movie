const { StatusCodes } = require('http-status-codes');
const { RPCObserver } = require("../utils");
const MovieService = require("../services/movie-service");

const UserAuth = require("./middlewares/auth");

module.exports = (app, channel) => {
  
  const service = new MovieService();
  
  RPCObserver("MOVIE_RPC", service);
  
  app.post("/movie/create", async (req, res, next) => {
    const { title, genre, releaseYear, director, plot, rating, reviews, unit, price , available } =
      req.body;
    // validation
    const { data } = await service.CreateMovie({
      title, 
      genre, 
      releaseYear,  
      director, 
      plot, 
      rating, 
      reviews, 
      unit,
      price , 
      available
    });
    return res.status(StatusCodes.OK).json(data);
  });



  app.get("/genre/:type", async (req, res, next) => {
    const genre = req.params.genre;

    try {
      const { data } = await service.GetMoviesByCategory(genre);
      return res.status(StatusCodes.OK).json(data);
    } catch (error) {
      return res.status(StatusCodes.NOT_FOUND).json({ error });
    }
  });

  app.get("/:id", async (req, res, next) => {
    const movieId = req.params.id;

    try {
      const { data } = await service.GetMovieDescription(movieId);
      return res.status(StatusCodes.OK).json(data);
    } catch (error) {
      return res.status(StatusCodes.NOT_FOUND).json({ error });
    }
  });

  app.post("/ids", async (req, res, next) => {
    const { ids } = req.body;
    const movies = await service.GetSelectedMovies(ids);
    return res.status(StatusCodes.OK).json(movies);
  });

   app.get("/movies", async (req, res, next) => {
    try {
      const { data } = await service.GetMovies();
      return res.status(StatusCodes.OK).json(data);
    } catch (error) {
      return res.status(StatusCodes.NOT_FOUND).json({ error });
    }
  });
};

