import Subscriber from '../../model/Subscriber';
import Subscripion from '../../model/Subscription';
import Settings from '../../model/Settings';
import User from '../../model/User';
import helper from '../../helpers/helper';
import Payment from '../../model/Payment';
import UserController from '../../controllers/userController';
import SettingController from '../../controllers/settingController'
import SubscriptionController from '../../controllers/subcriptionController';


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
    async getUsers(parent: any, args: any, context: any, info: any){
      try {
         return UserController.getUsers();
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
     async getOneSubscriber(parent: any, args: any, context: any, info: any) {
       try {
           const id = args._id;           
           const subscriber = await Subscriber.findOne({_id: id });
            return subscriber;
       } catch (error) {
        throw new Error(error);
       }
     },
  
     async getSubscriptions(parent: any, args: any, context: any, info: any){
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
        const settings = await Settings.find();
        console.log(settings)
        return settings
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
      },
      async  getOneSetting(parent: any, args: any, context: any, info: any){  
         const id = args.id;
         console.log(" ok je suis la", args);
         return SettingController.getOneSettings(id);
      }

   },
   Mutation: {
    async createUser(parent: any, args: any, context: any, info: any){
           let user = JSON.parse(JSON.stringify(args));
           console.log(user);
         return await UserController.register(user);
  
     },

     async createSettings(parent: any, args: any, context: any, info: any){
       try {
            let data = JSON.parse(JSON.stringify(args));
            return await SettingController.addSetting(data);
          
       } catch (error) {
        throw new Error(error);
       }
     }, 
     async updateSettings(id: String, toInsert: any){
       try {
      await Settings.findOneAndUpdate({_id: id}, toInsert,  {upsert: true}, function(err:any, doc:any){
          if(doc){
            console.log(doc)
            return doc;
          }
        })
         
       } catch (error) {
           throw new Error(error);  
       }
     },
    async deleteSettings(parent: any, args: any, context: any, info: any){
        let id = args.id;
        let response = await SettingController.deleteSettings(id);
        if(response){
          return {success: true};
      }
      return null
   },
   async createPayment(data:any){
    try {
          const payment = new Payment(data)
          return await payment.save();
    } catch (error) {
      throw new Error(error);
    }
   },

   async createSubscriber(root:any, args:any){
    try {
      let data       = JSON.parse(JSON.stringify(args))
      let subscriber = await new Subscriber(data);
      return subscriber.save();
    } catch (error) {
      throw new Error(error);
      
    }
   },
   async updateSubscriber( root:any, args:any, id: String, data :any){
        try {
         

          let sub = await Subscriber.findOneAndUpdate({_id: id}, data);
          if(sub)
          {
            return sub;
          }
          else {
              throw new Error("Erreur");
          }
        } catch (error) {
            throw new Error(error);
            
        }
   },
   async  deleteSubscriber(id: String){
    return await Subscriber.findOneAndDelete({_id:id});
   },
 // Subscription Mutations
   async createSubscription(parent: any, args: any, context: any, info: any){
      try {
        let data_json = JSON.parse(JSON.stringify(args));
        let data      = data_json['data'];
        let item      =  await SubscriptionController.createSubscription(data);
        return item;

      } catch (error) {
        throw new Error(error);
      }
   },
    async updateSubscription(parent: any, args: any, context: any, info: any){
      try {
        let data_json = JSON.parse(JSON.stringify(args));
        const id = data_json.id;
        let data = data_json['data'];
       return SubscriptionController.updateSubscription(id, data);
        
      } catch (error) {
        throw new Error("Error 500");
      }
    },
    async deleteSubscription(id: String){
      
    },
 
    async deleteUser(id: String){

    }

   },
 
}
