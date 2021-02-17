import { model, Schema, ObjectId } from  'mongoose';

const userSchema = new Schema({
    firstname : {type: String},
    lastname: {type: String},
    type: {type: String}
}, {timestamps: true});

export default model('User', userSchema);


