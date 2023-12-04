const { ShoppingRepository } = require("../database");
const { FormateData } = require("../utils");


class ShoppingService {

    constructor(){
        this.repository = new ShoppingRepository();
    }

    async GetCart({ _id }){
        
        const cartItems = await this.repository.Cart(_id);
        return FormateData(cartItems);
    }


    async PlaceOrder(userInput){

        const { _id } = userInput

        const orderResult = await this.repository.CreateNewOrder(_id );
        
        return FormateData(orderResult);
    }

    async GetOrders(customerId){
        
        const orders = await this.repository.Orders(customerId);
        return FormateData(orders)
    }

    async GetOrderDetails({ _id,orderId }){
        const orders = await this.repository.Orders(movieId);
        return FormateData(orders)
    }

    async ManageCart(customerId, item, qty, isRemove){

        const cartResult = await this.repository.AddCartItem(customerId,item,qty, isRemove);
        return FormateData(cartResult);
    }
     

    async SubscribeEvents(payload){
 
        payload = JSON.parse(payload);
        const { event, data } = payload;
        const { userId, movie, qty } = data;
        
        switch(event){
            case 'ADD_TO_CART':
                this.ManageCart(userId, movie, qty, false);
                break;
            case 'REMOVE_FROM_CART':
                this.ManageCart(userId, movie, qty, true);
                break;
            default:
                break;
        }
 
    }


    async GetOrderPayload(userId,order,event){

       if(order){
            const payload = { 
               event: event,
               data: { userId, order }
           };

            return payload
       }else{
           return FormateData({error: 'No Order Available'});
       }

   }

 

}

module.exports = ShoppingService;
