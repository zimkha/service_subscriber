import { model, Schema, Model } from "mongoose";


const SettingsSchema = new Schema({
  organize_your_agenda: {type:  Boolean, default: true},
  confirm_appointment_requests: {type: Boolean, default: true},
  consult_the_health_record: {type: Boolean, default: true},
  reminder_email : {type: Boolean, default: false},
  reminder_sms: {type: Boolean, default: false},
  give_consultation_note: {type: Boolean, default: false},
  prescription_editing: {type: Boolean, default: false},
  appointment_notification_sms: {type: Boolean, default: false},
  billing_sms: {type: Boolean, default: false},
  teleconsultation_medical : {type: Boolean, default: false}},
   {timestamps: true});


export default model('Settings', SettingsSchema);