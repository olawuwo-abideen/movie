const { StatusCodes } = require('http-status-codes');
const ShoppingService = require("../services/shopping-service");
const { PublishCustomerEvent, SubscribeMessage } = require("../utils");
const  UserAuth = require('./middlewares/auth');
const { CUSTOMER_SERVICE } = require('../config');
const { PublishMessage } = require('../utils')

module.exports = (app, channel) => {
    
    const service = new ShoppingService();

    SubscribeMessage(channel, service)


      // Cart
  app.post("/cart", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    const { movie_id, qty } = req.body;
    const { data } = await service.AddCartItem(_id, movie_id, qty);
    res.status(StatusCodes.OK).json(data);
  });

  app.delete("/cart/:id", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    const movieId = req.params.id;
    const { data } = await service.RemoveCartItem(_id, movieId);
    res.status(StatusCodes.OK).json(data);
  });

  app.get("/cart", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    const data = await service.GetCart(_id);
    return res.status(StatusCodes.OK).json(data);
  });

  // Wishlist
  app.post("/wishlist", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    const { movie_id } = req.body;
    console.log(req.body);
    const data = await service.AddToWishlist(_id, movie_id);
    return res.status(StatusCodes.OK).json(data);
  });
  app.get("/wishlist", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    const data = await service.GetWishlist(_id);
    return res.status(StatusCodes.OK).json(data);
  });
  app.delete("/wishlist/:id", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    const movie_id = req.params.id;
    const data = await service.RemoveFromWishlist(_id, movie_id);
    return res.status(StatusCodes.OK).json(data);
  });

  // Orders
  app.post("/order", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    const { txnNumber } = req.body;
    const data = await service.CreateOrder(_id, txnNumber);
    return res.status(StatusCodes.OK).json(data);
  });

  app.get("/order/:id", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    const data = await service.GetOrder(_id);
    return res.status(StatusCodes.OK).json(data);
  });

  app.get("/orders", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    const data = await service.GetOrders(_id);
    return res.status(StatusCodes.OK).json(data);
  });

}
