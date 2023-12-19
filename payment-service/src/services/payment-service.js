const { PaymentRepository } = require("../database");
const { FormateData, RPCRequest } = require("../utils");

// All Business logic will be here
class PaymentService {
    constructor() {
      this.repository = new PaymentRepository();
    }

}
















module.exports = PaymentService;