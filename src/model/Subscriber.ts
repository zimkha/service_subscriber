import { model, Schema } from "mongoose";


const SubscriberSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref : 'User'},
  subcription : {type: Schema.Types.ObjectId, ref : 'Subscription'},
  settings : {type: Schema.Types.ObjectId, ref : 'Settings'},
  date_start: {type : Date},
  date_end: {type: Date},
  status: {type: Boolean},
  payments: [
    {
      status: {type: Boolean},
      date_payment: {type: Date},
      date_created: {type: Date}
    }
  ]
}, {timestamps: true});


export default model('Subcriber', SubscriberSchema);