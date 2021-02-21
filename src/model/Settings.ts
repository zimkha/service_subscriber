import { model, Schema, Model } from "mongoose";


const SettingsSchema = new Schema({
  organize_your_agenda: {type:  Boolean},
  confirm_appointment_requests: {type: Boolean},
  consult_the_health_record: {type: Boolean},
  reminder_email : {type: Boolean},
  reminder_sms: {type: Boolean},
  give_consultation_note: {type: Boolean},
  prescription_editing: {type: Boolean},
  appointment_notification_sms: {type: Boolean},
  billing_sms: {type: Boolean},
  teleconsultation_medical : {type: Boolean},}, {timestamps: true});


export default model('Settings', SettingsSchema);