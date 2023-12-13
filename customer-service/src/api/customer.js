const CustomerService = require('../services/customer-service');
const  UserAuth = require('./middlewares/auth');
const { SubscribeMessage } = require('../utils');
const { StatusCodes } = require('http-status-codes');


module.exports = (app, channel) => {
    
    const service = new CustomerService();

    app.post("/signup", async (req, res, next) => {
        try {
          const { email, password, phone } = req.body;
          const data = await service.SignUp({ email, password, phone });
          return res.json(data);
        } catch (error) {
          next(error);
        }
      });
    

    app.post("/login", async (req, res, next) => {
        try {
          const { email, password } = req.body;
          const data = await service.SignIn({ email, password });
          return res.json(data);
        } catch (error) {
          next(error);
        }
      });

      
  app.post("/address", UserAuth, async (req, res, next) => {
        try {
        const { _id } = req.user;
        const { street, postalCode, city, country } = req.body;
        const data = await service.AddNewAddress(_id, {
            street,
            postalCode,
            city,
            country,
        });
        return res.json(data);
        } catch (error) {
        next(error);
        }
    });
        

    app.get("/profile", UserAuth, async (req, res, next) => {
        try {
          const { _id } = req.user;
          const data = await service.GetProfile({ _id });
          return res.json(data);
        } catch (error) {
          next(error);
        }
      });

    }