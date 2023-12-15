const { APIError } = require("../../utils/errors/app-errors");
const { DeliveryModel, AddressModel } = require("../models");

//Dealing with data base operations
class DeliveryRepository {
  async CreateDelivery({ email, password, phone, firstName, lastName, salt }) {
    const delivery = new DeliveryModel({
      email,
      password,
      salt,
      phone,
      firstName,
      lastName,
      address: [],
    });

    const deliveryResult = await delivery.save();
    return deliveryResult;
  }

  async CreateAddress({ _id, street, postalCode, city, country }) {
    const profile = await DeliveryModel.findById(_id);
    
    if (profile) {
      const newAddress = new AddressModel({
        street,
        postalCode,
        city,
        country,
      });

      await newAddress.save();

      profile.address.push(newAddress);
    }

    return await profile.save();
  }

  async FindDelivery({ email }) {
    const existingDelivery = await DeliveryModel.findOne({ email: email });
    return existingDelivery;
  }

  async FindDeliveryById({ id }) {
    const existingDelivery = await DeliveryModel.findById(id).populate(
      "address"
    );
    return existingDelivery;
  }

  async DeleteDeliveryById(id) {
    return DeliveryModel.findByIdAndDelete(id);
  }
}

module.exports = DeliveryRepository;
