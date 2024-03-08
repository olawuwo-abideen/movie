const PaymentService = require('../services/payment-service');
const  UserAuth = require('./middlewares/auth');
const { SubscribeMessage } = require('../utils');
const { StatusCodes } = require('http-status-codes');



module.exports = (app, channel) => {
  
  const service = new PaymentService();

 
  SubscribeMessage(channel, service);


  app.post('/payment/makePurchase', async (req, res, next) => {

    const {validate} = req.container.cradle

    validate(req.body.paymentOrder, 'payment')
      .then(payment => {
        return repo.registerPurchase(payment)
      })
      .then(paid => {
        res.status(StatusCodes.OK).json({paid})
      })
      .catch(next)
  })



  app.get('/payment/getPurchaseById/:id', async (req, res, next) => {

    const paymentId = req.params.id;

    try {
    const { payment } = await service.getPurchaseById(paymentId);
    return res.status(StatusCodes.OK).json(payment);
  } catch (error) {
    return res.status(StatusCodes.NOT_FOUND).json({ error });
  }


  })

}

