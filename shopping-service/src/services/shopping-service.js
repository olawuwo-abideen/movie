const { ShoppingRepository } = require("../database");
const { FormateData, RPCRequest } = require("../utils");

// All Business logic will be here
class ShoppingService {
  constructor() {
    this.repository = new ShoppingRepository();
  }

  // Cart Info
  async AddCartItem(customerId, movie_id, qty) {
    // Grab product info from product Service through RPC
    const movieResponse = await RPCRequest("MOVIE_RPC", {
      type: "VIEW_MOVIE",
      data: movie_id,
    });
    if (movieResponse && movieResponse._id) {
      const data = await this.repository.ManageCart(
        customerId,
        movieResponse,
        qty
      );
      return data;
    }

    throw new Error("Movie data not found!");
  }

  async RemoveCartItem(customerId, movie_id) {
    return await this.repository.ManageCart(
      customerId,
      { _id: movie_id },
      0,
      true
    );
  }

  async GetCart(_id) {
    return this.repository.Cart(_id);
  }

  // Wishlist
  async AddToWishlist(customerId, movie_id) {
    return this.repository.ManageWishlist(customerId, movie_id);
  }

  async RemoveFromWishlist(customerId, movie_id) {
    return this.repository.ManageWishlist(customerId, movie_id, true);
  }

  async GetWishlist(customerId) {
    const wishlist = await this.repository.GetWishlistByCustomerId(customerId);
    if (!wishlist) {
      return {};
    }
    const { movies } = wishlist;

    if (Array.isArray(movies)) {
      const ids = movies.map(({ _id }) => _id);
      // Perform RPC call
      const movieResponse = await RPCRequest("MOVIE_RPC", {
        type: "VIEW_MOVIES",
        data: ids,
      });
      if (movieResponse) {
        return movieResponse;
      }
    }

    return {};
  }

  // Orders
  async CreateOrder(customerId, txnNumber) {
    return this.repository.CreateNewOrder(customerId, txnNumber);
  }

  async GetOrder(orderId) {
    return this.repository.Orders("", orderId);
  }

  async GetOrders(customerId) {
    return this.repository.Orders(customerId);
  }

  async ManageCart(customerId, item, qty, isRemove) {
    const cartResult = await this.repository.AddCartItem(
      customerId,
      item,
      qty,
      isRemove
    );
    return FormateData(cartResult);
  }

  async SubscribeEvents(payload) {
    payload = JSON.parse(payload);
    const { event, data } = payload;
    const { userId, movie, qty } = data;

    switch (event) {
      case "ADD_TO_CART":
        this.ManageCart(userId, movie, qty, false);
        break;
      case "REMOVE_FROM_CART":
        this.ManageCart(userId, movie, qty, true);
        break;
      default:
        break;
    }
  }

  async deleteProfileData(customerId) {
    return this.repository.deleteProfileData(customerId);
  }

  async SubscribeEvents(payload) {
    payload = JSON.parse(payload);
    const { event, data } = payload;
    switch (event) {
      case "DELETE_PROFILE":
        await this.deleteProfileData(data.userId);
        break;
      default:
        break;
    }
  }

}

module.exports = ShoppingService;
