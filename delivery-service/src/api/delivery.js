const DeliveryService = require('../services/delivery-service');
const  DeliveryAuth = require('./middlewares/auth');
const { SubscribeMessage } = require('../utils');
const { StatusCodes } = require('http-status-codes');


module.exports = (app, channel) => {
    
    const service = new DeliveryService();
    app.post("/signup", async (req, res, next) => {
        try {
          const { email, password, phone, firstName, lastName, } = req.body;
          const data = await service.SignUp({ email, password, phone, firstName, lastName, });
          return res.status(StatusCodes.OK).json(data);
        } catch (error) {
          next(error);
        }
      });
   
    app.post("/login", async (req, res, next) => {
        try {
          const { email, password } = req.body;
          const data = await service.SignIn({ email, password });
          return res.status(StatusCodes.OK).json(data);
        } catch (error) {
          next(error);
        }
      });

    app.post("/address", DeliveryAuth, async (req, res, next) => {
        try {
        const { _id } = req.user;
        const { street, postalCode, city, country } = req.body;
        const data = await service.AddNewAddress(_id, {
            street,
            postalCode,
            city,
            country,
        });
        return res.status(StatusCodes.OK).json(data);
        } catch (error) {
        next(error);
        }
    });
    
    app.get("/profile", DeliveryAuth, async (req, res, next) => {
        try {
          const { _id } = req.user;
          const data = await service.GetProfile({ _id });
          return res.status(StatusCodes.OK).json(data);;
        } catch (error) {
          next(error);
        }
      });

    }