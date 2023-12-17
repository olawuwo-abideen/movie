const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NotificationSchema = new Schema(
  {
    customer: [{ type: Schema.Types.ObjectId, ref: "customer", require: true }],
    delivery: [{ type: Schema.Types.ObjectId, ref: "delivery", require: true }],
    order: [{ type: Schema.Types.ObjectId, ref: "order", require: true }],
    movie: [{ type: Schema.Types.ObjectId, ref: "movie", require: true }]
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.salt;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

module.exports = mongoose.model("notification", NotificationSchema);
