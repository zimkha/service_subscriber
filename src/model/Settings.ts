import { model, Schema } from "mongoose";


const SettingsSchema = new Schema({

}, {timestamps: true});


export default model('Settings', SettingsSchema);