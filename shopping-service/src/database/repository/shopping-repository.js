const mongoose = require("mongoose");
const { OrderModel, CartModel, WishlistModel } = require("../models");
const { v4: uuidv4 } = require("uuid");
const _ = require("lodash");

//Dealing with data base operations
class ShoppingRepository {
    // Cart
    async Cart(customerId) {
      return CartModel.findOne({ customerId });
    }
  
    async ManageCart(customerId, movie, qty, isRemove) {
      const cart = await CartModel.findOne({ customerId });
      if (cart) {
        if (isRemove) {
          const cartItems = _.filter(
            cart.items,
            (item) => item.movie._id !== movie._id
          );
          cart.items = cartItems;
          // handle remove case
        } else {
          const cartIndex = _.findIndex(cart.items, {
            movie: { _id: movie._id },
          });
          if (cartIndex > -1) {
            cart.items[cartIndex].unit = qty;
          } else {
            cart.items.push({ movie: { ...movie }, unit: qty });
          }
        }
        return await cart.save();
      } else {
        // create a new one
        return await CartModel.create({
          customerId,
          items: [{ movie: { ...movie }, unit: qty }],
        });
      }
    }
  
    async ManageWishlist(customerId, movie_id, isRemove = false) {
      const wishlist = await WishlistModel.findOne({ customerId });
      if (wishlist) {
        if (isRemove) {
          const movies = _.filter(
            wishlist.movies,
            (movie) => movie._id !== movie_id
          );
          wishlist.movies = movies;
          // handle remove case
        } else {
          const wishlistIndex = _.findIndex(wishlist.movies, {
            _id: movie_id,
          });
          if (wishlistIndex < 0) {
            wishlist.movies.push({ _id: movie_id });
          }
        }
        return await wishlist.save();
      } else {
        // create a new one
        return await WishlistModel.create({
          customerId,
          wishlist: [{ _id: movie_id }],
        });
      }
    }
  
    async GetWishlistByCustomerId(customerId) {
      return WishlistModel.findOne({ customerId });
    }
  
    async Orders(customerId, orderId) {
      if (orderId) {
        return OrderModel.findOne({ _id: orderId });
      } else {
        return OrderModel.find({ customerId });
      }
    }
  
    async CreateNewOrder(customerId, txnId) {
      const cart = await CartModel.findOne({ customerId: customerId });
  
      if (cart) {
        let amount = 0;
  
        let cartItems = cart.items;
  
        if (cartItems.length > 0) {
          //process Order
  
          cartItems.map((item) => {
            amount += parseInt(item.movie.price) * parseInt(item.unit);
          });
  
          const orderId = uuidv4();
  
          const order = new OrderModel({
            orderId,
            customerId,
            amount,
            status: "received",
            items: cartItems,
          });
  
          cart.items = [];
  
          const orderResult = await order.save();
          await cart.save();
          return orderResult;
        }
      }
  
      return {};
    }
  
    async deleteProfileData(customerId) {
      return Promise.all([
        CartModel.findOneAndDelete({ customerId }),
        WishlistModel.findOneAndDelete({ customerId }),
      ]);
    }
  }
  
  module.exports = ShoppingRepository;
  