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

    }