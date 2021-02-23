import Subscriber from '../model/Subscriber'
import Subscription from '../model/Subscription';
import User from '../model/User';
import Settings from '../model/Settings';
import { ObjectId } from 'mongodb'



class SubscriberController {

  subscriber : any
   constructor() 
   {
     this.subscriber = typeof Subscriber
   }

   static async getSubscriber(id: string) {

   }

   static async updateSubscriber() {

  }

  static async deleteSubscriber() {

  }

  static async createSubscriber(data: any) {
    const userId         = data.userId;
    const subscriptionId = data.subscriptionId;
    const settings       = data['sett'];
    const userExist =  await User.findOne({_id: userId});
    const subsExist =  await Subscription.findOne({_id: subscriptionId});
    console.log("Les settings",settings)
    if(userExist._id && subsExist._id) {
     
      const setting_create = await  Settings.create(settings);
      if(setting_create) {
        let toInsert = {
           user: userExist._id,
           subcription: subsExist._id,
           settings: setting_create,
           date_start: new Date(),
           date_end: new Date(),
           status: true
        };
         const save_me =  await Subscriber.create(toInsert); 
         console.log(userExist, subsExist, save_me);
         if(save_me) {
           return  {
            success: true,
            message: "Successful!",
            user: userExist,
            subscription: subsExist
           };
         }
      }
     
    }
    else {
       return {
        success: false,
        message: "Failed!",
        user: null,
        subscription: null
       }
    }
  }


}
export default SubscriberController;