const { DeliveryRepository } = require("../database");
const {
  FormateData,
  GeneratePassword,
  GenerateSalt,
  GenerateSignature,
  ValidatePassword,
} = require("../utils");
const {
  NotFoundError,
  ValidationError,
} = require("../utils/errors/app-errors");

// All Business logic will be here
class DeliveryService {
  constructor() {
    this.repository = new DeliveryRepository();
  }

  async SignIn(userInputs) {
    const { email, password } = userInputs;

    const existingDelivery = await this.repository.FindDelivery({ email });

    if (!existingDelivery)
      throw new NotFoundError("user not found with provided email id!");

    const validPassword = await ValidatePassword(
      password,
      existingDelivery.password,
      existingDelivery.salt
    );
    if (!validPassword) throw new ValidationError("password does not match!");

    const token = await GenerateSignature({
      email: existingDelivery.email,
      _id: existingDelivery._id,
    });

    return { id: existingDelivery._id, token };
  }

  async SignUp(userInputs) {
    const { email, password, phone, firstName, lastName } = userInputs;

    // create salt
    let salt = await GenerateSalt();

    let userPassword = await GeneratePassword(password, salt);

    const existingDelivery = await this.repository.CreateDelivery({
      email,
      password: userPassword,
      phone,
      firstName,
      lastName,
      salt,
    });

    const token = await GenerateSignature({
      email: email,
      _id: existingDelivery._id,
    });
    return { id: existingDelivery._id, token };
  }

  async AddNewAddress(_id, userInputs) {
    const { street, postalCode, city, country } = userInputs;

    return this.repository.CreateAddress({
      _id,
      street,
      postalCode,
      city,
      country,
    });
  }

  async GetProfile(id) {
    return this.repository.FindDeliveryById({ id });
  }

}

module.exports = DeliveryService;
