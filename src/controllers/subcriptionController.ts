import { ObjectId } from 'mongodb'
import Subscription from '../model/Subscription';

class SubscriptionController {

  static getSubcriptions() {
      let items = Subscription.find((err: any, docs: any) => {
         if(!err) {
           return docs
         }
         throw new Error("Error 500");
      })
      return items
  }

  static getOnSubscription(id: string) {
    let item = Subscription.findById({_id: id}, (err:any, docs:any) => {
      console.log(item)
      if(!err) {
        return docs;
      }
      throw new Error("Error can not make this request");
    })
    return item;
  }
  static async createSubscription(data: any) {
   try {
    let item = await Subscription.create(data);
    return item;
   } catch (error) {
     throw new Error("Error 500");
   }
  }
  static async updateSubscription(id:string, data:any) {
    let item = await Subscription.updateOne({
      _id: id
    }, {data}, { upsert: true })
    if(item) {
      console.log(item, "le doc")
      return true;
    }
    return false;
  }
}

export default SubscriptionController;