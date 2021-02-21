import { model, Schema } from "mongoose";


const PaymentSchema = new Schema({
   subscriber: {type: Schema.Types.ObjectId, ref : 'Subscriber'},
   date_payment: {type: Date, default: Date.now},
}, {timestamps: true});


export default model('Payment', PaymentSchema);