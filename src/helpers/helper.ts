import config_variable from '../config/config.variable';

export default {
  /**
   * cette fonction permet de verifier si le
   * tableau donnné en parametre est complet
   */
   helpeMe: {
        async  check_me(req: any, res: any, data: any) {
          let err = [];
           if(!data.organize_your_agenda || data.organize_your_agenda==undefined){
              let item = 'enable to find attribut organize_your_agenda'
              err.push(item);
           }
            if(!data.confirm_appointment_requests || data.confirm_appointment_requests==undefined){
              let item = 'enable to find attribut confirm_appointment_requests'
              err.push(item);
           }
           if(!data.consult_the_health_record || data.consult_the_health_record==undefined){
            let item = 'enable to find attribut consult_the_health_record'
            err.push(item);
          }
          if(!data.reminder_email || data.reminder_email==undefined){
            let item = 'enable to find attribut reminder_email'
            err.push(item);
          }
          if(!data.reminder_sms || data.reminder_sms==undefined){
            let item = 'enable to find attribut reminder_sms'
            err.push(item);
          }
          if(!data.give_consultation_note || data.give_consultation_note==undefined){
            let item = 'enable to find attribut give_consultation_note'
            err.push(item);
          }
          if(!data.prescription_editing || data.prescription_editing==undefined){
            let item = 'enable to find attribut prescription_editing'
            err.push(item);
          }
          if(!data.appointment_notification_sms || data.appointment_notification_sms==undefined){
            let item = 'enable to find attribut appointment_notification_sms'
            err.push(item);
          }
          if(!data.billing_sms || data.billing_sms==undefined){
            let item = 'enable to find attribut billing_sms'
            err.push(item);
          }
           if(err.length >= 1){
            return res.status(401).send(JSON.stringify(err))
           }
           else{
             return true;
           }

        },
        async getPrice(setting: any){
          let price = 0;
          if(setting.organize_your_agenda == true){
            price += config_variable.ORGANIZE_YOUR_AGENDA
          }
          if(setting.confirm_appointment_requests == true){
            price += config_variable.CONFIRM_APPOINTMENT_REQUEST
          }
          if(setting.consult_the_health_record == true){
            price += config_variable.CONSULT_THE_HEALTH_RECORD
          }
          if(setting.reminder_email == true){
            price += config_variable.REMINDER_EMAIL
          }
          if(setting.reminder_sms == true){
            price += config_variable.REMINDER_SMS
          }
          if(setting.give_consultation_note == true){
            price += config_variable.GIVE_CONSULTATION_NOTE
          }
          if(setting.prescription_editing == true){
            price += config_variable.PRESCRIPTION_ENDING
          }
          if(setting.appointment_notification_sms == true){
            price += config_variable.APPOINTMENT_NOTIFICATION_SMS
          }
          if(setting.billing_sms == true){
            price += config_variable.BILLINGS_SMS
          }
          return price;
        }
   }
}