import { model, Schema, ObjectId } from "mongoose";

const SubscriptionSchema = new Schema({
  name: {type: String},
  dure: {type: String},
  price: {type: Number}
}, { timestamps: true });

export default model("Subscription", SubscriptionSchema);