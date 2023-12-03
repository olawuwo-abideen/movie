const { StatusCodes } = require('http-status-codes');
const { ValidateSignature } = require('../../utils');

module.exports = async (req,res,next) => {
    
    const isAuthorized = await ValidateSignature(req);

    if(isAuthorized){
        return next();
    }
    return res.status(StatusCodes.FORBIDDEN).json({message: 'Not Authorized'})
}