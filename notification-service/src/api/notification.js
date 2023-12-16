const NotificationService = require('../services/notification-service');
const  UserAuth = require('./middlewares/auth');
const { SubscribeMessage } = require('../utils');
const { StatusCodes } = require('http-status-codes');


module.exports = (app, channel) => {
    
    const service = new NotificationService();

    // To listen
    SubscribeMessage(channel, service);

    app.post('/notification/sendEmail', (req, res, next) => {
        const {validate} = req.container.cradle
    
        validate(req.body.payload, 'notification')
          .then(payload => {
            return repo.sendEmail(payload)
          })
          .then(ok => {
            res.status(StatusCodes.OK).json({msg: 'ok'})
          })
          .catch(next)
      })
    
      app.post('/notification/sendSMS', (req, res, next) => {
        const {validate} = req.container.cradle
    
        validate(req.body.payload, 'notification')
          .then(payload => {
            return repo.sendSMS(payload)
          })
          .then(ok => {
            res.status(StatusCodes.OK).json({msg: 'ok'})
          })
          .catch(next)
      })

}
