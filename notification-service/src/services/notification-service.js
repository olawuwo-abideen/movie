const { NotificationRepository } = require("../database");
const { FormateData, RPCRequest } = require("../utils");



// All Business logic will be here
class NotificationService {
    constructor() {
      this.repository = new NotificationRepository();
    }

}
















module.exports = NotificationService;