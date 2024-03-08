const AdminService = require('../services/admin-service');
const  UserAuth = require('./middlewares/auth');
const { SubscribeMessage } = require('../utils');
const { StatusCodes } = require('http-status-codes');


module.exports = (app, channel) => {
    
    const service = new AdminService();
    app.post("admin/signup", async (req, res, next) => {
        try {
          const { email, password, phone } = req.body;
          const data = await service.SignUp({ email, password, phone });
          return res.json(data);
        } catch (error) {
          next(error);
        }
      });
    
    app.post("admin/login", async (req, res, next) => {
        try {
          const { email, password } = req.body;
          const data = await service.SignIn({ email, password });
          return res.json(data);
        } catch (error) {
          next(error);
        }
      });
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
    
       app.get("/movies", async (req, res, next) => {
        try {
          const { data } = await service.GetMovies();
          return res.status(StatusCodes.OK).json(data);
        } catch (error) {
          return res.status(StatusCodes.NOT_FOUND).json({ error });
        }
      });
    };
    
    
    
