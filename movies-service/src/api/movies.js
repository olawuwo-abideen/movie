const { StatusCodes } = require('http-status-codes');
const { CUSTOMER_SERVICE, SHOPPING_SERVICE } = require("../config");
const MovieService = require("../services/movie-service");
const {
  PublishCustomerEvent,
  PublishShoppingEvent, 
  PublishMessage,
} = require("../utils");
const UserAuth = require("./middlewares/auth");

module.exports = (app, channel) => {
  const service = new MovieService();

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

  app.put("/wishlist", UserAuth, async (req, res, next) => {
    const { _id } = req.user;

    const { data } = await service.GetMoviePayload(
      _id,
      { movieId: req.body._id },
      "ADD_TO_WISHLIST"
    );
    PublishMessage(channel, CUSTOMER_SERVICE, JSON.stringify(data));

    res.status(StatusCodes.OK).json(data.data.product);
  });

  app.delete("/wishlist/:id", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    const movieId = req.params.id;

    const { data } = await service.GetMoviePayload(
      _id,
      { movieId },
      "REMOVE_FROM_WISHLIST"
    );
    PublishMessage(channel, CUSTOMER_SERVICE, JSON.stringify(data));

    res.status(StatusCodes.OK).json(data.data.movie);
  });

  app.put("/cart", UserAuth, async (req, res, next) => {
    const { _id } = req.user;

    const { data } = await service.GetMoviePayload(
      _id,
      { movieId: req.body._id, qty: req.body.qty },
      "ADD_TO_CART"
    );


    PublishMessage(channel, CUSTOMER_SERVICE, JSON.stringify(data));
    PublishMessage(channel, SHOPPING_SERVICE, JSON.stringify(data));

    const response = { product: data.data.movie, unit: data.data.qty };

    res.status(StatusCodes.OK).json(response);
  });

  app.delete("/cart/:id", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    const movieId = req.params.id;

    const { data } = await service.GetMoviePayload(
      _id,
      { movieId },
      "REMOVE_FROM_CART"
    );

    PublishMessage(channel, CUSTOMER_SERVICE, JSON.stringify(data));
    PublishMessage(channel, SHOPPING_SERVICE, JSON.stringify(data));

    const response = { movie: data.data.movie, unit: data.data.qty };

    res.status(StatusCodes.OK).json(response);
  });

  app.get("/movies", async (req, res, next) => {
    //check validation
    try {
      const { _id } = req.user;
      const { data } = await service.GetMovies();
      return res.status(StatusCodes.OK).json(data);
    } catch (error) {
      return res.status(StatusCodes.NOT_FOUND).json({ error });
    }
  });
};
