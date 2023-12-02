const  StatusCodes  = require('http-status-codes');




class AppError extends Error {
    constructor(name,StatusCodes,description, isOperational, errorStack, logingErrorResponse){
        super(description);
        Object.setPrototypeOf(this,new.target.prototype);
        this.name = name;
        this.StatusCodes = StatusCodes;
        this.isOperational = isOperational
        this.errorStack = errorStack;
        this.logError = logingErrorResponse;
        Error.captureStackTrace(this);
    }
}

//api Specific Errors
class APIError extends AppError {
    constructor(name, StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR, description ='Internal Server Error',isOperational = true,){
        super(name,StatusCodes.BAD_REQUEST,description,isOperational);
    }
}

//400
class BadRequestError extends AppError {
    constructor(description = 'Bad request',logingErrorResponse){
        super('NOT FOUND', StatusCodes.BAD_REQUEST,description,true, false, logingErrorResponse);
    }
}

//400
class ValidationError extends AppError {
    constructor(description = 'Validation Error', errorStack){
        super('BAD REQUEST', StatusCodes.BAD_REQUEST,description,true, errorStack);
    }
}


module.exports = {
    AppError,
    APIError,
    BadRequestError,
    ValidationError,
    StatusCodes,
}
