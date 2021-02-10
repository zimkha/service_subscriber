import Subscriber from '../../model/Subscriber';
import Subscripion from '../../model/Subscription';
import Settings from '../../model/Settings';
import User from '../../model/User';
import helpers from '../../helpers/helper';
import helper from '../../helpers/helper';
import Payment from '../../model/Payment';


export default {

   Query : {
    async getUser(id: String){
     try {
        const user = await User.findOne({_id: id});
        if(user){
          return user;
        }
        return null;
     } catch (error) {
       throw new Error(error);  
     }
    },
    async getUsers(){
      try {
        const users = await User.find();
        return users
      } catch (error) {
        throw new Error(error);
      }
    },
     async getSubscribers () {
       try {
          const subscribers = await  Subscriber.find();
          return subscribers;
       } catch (error) {
        throw new Error(error);
       }
     },
     async getOneSubscriber(id: string) {
       try {
          
           const subscriber = await Subscriber.findOne({_id: id });
            return subscriber;
       } catch (error) {
        throw new Error(error);
       }
     },
  
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
    async createUser(data: any){
   
      let user =  new User(data);
      return await user.save();
  
     },

     async createSettings(root:any, args:any){
       try {
            let data       = JSON.parse(JSON.stringify(args))
            let ojbectData = data.data
            let item     = await new Settings(ojbectData);
            return  item.save();
       } catch (error) {
        throw new Error(error);
       }
     }, 
     async updateSettings(id: String, toInsert: any){
       try {
            let item = await Settings.findOneAndUpdate({_id: id}, toInsert);
            return item;
       } catch (error) {
           throw new Error(error);  
       }
     },
    async deleteSettings(id: String){
      try {
        const item = await Settings.findOneAndDelete({_id: id});
        return item;   
      } catch (error) {
        throw new Error(error);
      }
   },
   async createPayment(data:any){
    try {
          const payment = new Payment(data)
          return await payment.save();
    } catch (error) {
      throw new Error(error);
    }
   },

   async createSubscriber(data:any){

   },
   async updateSubscriber(id: String, data :any){

   },
   async  deleteSubscriber(id: String){

   },

   async createSubscription(data:any){

   },
   async updateSubscription(id: String, data:any){

   },
   async deleteSubscription(id: String){
     
   },
 
   async deleteUser(id: String){

   }

   },
 
}
