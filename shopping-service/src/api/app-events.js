const { StatusCodes } = require('http-status-codes');
const ShoppingService = require("../services/shopping-service");

module.exports = (app) => {
    
    const service = new ShoppingService();

    app.use('/app-events',async (req,res,next) => {

        const { payload } = req.body;
        console.log("============= Shopping Services Received Event ================");
        
        console.log(payload);

         service.SubscribeEvents(payload);
         
       return res.status(StatusCodes.OK).json({message: 'notified!'});

    });

}
