// const ShoppingService = require("../services/shopping-service");
const { StatusCodes } = require('http-status-codes');
module.exports = (app) => {
    
    // const service = new ShoppingService();
    app.use('/app-events',async (req,res,next) => {

        const { payload } = req.body;

        console.log("============= Shopping ================");
        console.log(payload);

        return res.status(StatusCodes.OK).json({ message: 'notified!'});
 
    });

}
