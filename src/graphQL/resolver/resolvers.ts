import Subscriber from '../../model/Subscriber';
import Subscripion from '../../model/Subscription';
import Settings from '../../model/Settings';
import helpers from '../../helpers/helper';
import helper from '../../helpers/helper';

export default {
   Query : {
     async getSubscribers () {
       try {
          const subscribers = await  Subscriber.find();
          return subscribers;
       } catch (error) {
        throw new Error(error);
       }
     },
     async getOneSubscriber(id: String) {
       try {
           const subscriber = await Subscriber.findById({_id: id });
            return subscriber;
       } catch (error) {
        throw new Error(error);
       }
     },
    //  async getOneByAttribut(attribut: any){
    //    if(attribut.isArray()){
    //      if(attribut.length > 1){
    //           // Cela veux dire plusieurs parametres sont envoyés
    //           // et Que sa peux être []
    //      }
    //    }
    //  }, 
     async getSubscriptions(){
      try {
         const subscriptions = await Subscripion.find();
         return subscriptions
      } catch (error) {
        throw new Error(error);
      }
     }, 
     async getOneSubscription(id: String){
       const subscripion = await Subscripion.findById({_id: id});
       return subscripion;
     },
     async getSettings(){
      try {
        const settints = await Settings.find();
        return settints
     } catch (error) {
       throw new Error(error);
     }
     },
      async getSettingsBySubscriber (subscriberID: String){
            try {
                const subscriber = Subscriber.findById({_id: subscriberID});
                if(subscriber){
                  return  await Settings.findOne({_id: subscriber.settings_id});
                }
                else{
                  let err = new Error("enable to find data")
                }
            } catch (error) {
                throw new Error(error); 
            }
      }, 
      /**
       * @param {string} id
       */
      async getPriceSubscriber(id: String){
        //TODO: 
        try {
            const subscriber = await Subscriber.findOne({_id: id});
            if(subscriber){
                const setting = await Settings.findOne({_id: subscriber.settings});
                let price = await helper.helpeMe.getPrice(setting);
                if(price != 0 && price != undefined){
                   return price;
                }
            }
            else{
              throw new Error("not settings for this subscriber");
              
            }
        } catch (error) {
          throw new Error(error);
        }
      }
   },
   Mutation: {
     async createSettings(data: any){
       try {
        const toInsert = {
          organize_your_agenda:         data.organize_your_agenda,
          confirm_appointment_requests: data.confirm_appointment_requests,
          consult_the_health_record:    data.consult_the_health_record,
          reminder_email :              data.reminder_email,
          reminder_sms:                 data.reminder_sms,
          give_consultation_note:       data.give_consultation_note,
          prescription_editing:         data.prescription_editing,
          appointment_notification_sms: data.appointment_notification_sms,
          billing_sms:                  data.billing_sms
         };
         const item = new Settings(toInsert);
         return await item.save();
       } catch (error) {
        throw new Error(error);
       }
     }, 
     async updateSettings(id: String, toInsert: any){
       try {
           let item = Settings.findOne({_id: id});
            if(item){
              let req: any;
              let res: any;
                const result = await helpers.helpeMe.check_me(req, res, toInsert);
                if(result == true) {
                    // Si tous ce passe bien
                    return await item(toInsert).save();
                }else
                {
                   throw new Error(result);
                }
            }
       } catch (error) {
           throw new Error(error);  
       }
     }
   }
}