const { StatusCodes } = require('http-status-codes');
module.exports = (app) => {
    

    app.use('/app-events',async (req,res,next) => {

        const { payload } = req.body;

        console.log("============= Payment Service Received Event================");
        console.log(payload);

        return res.status(StatusCodes.OK).json({ message: 'notified!'});
 
    });

}
