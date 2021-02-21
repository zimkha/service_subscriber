import { ObjectId } from 'mongodb'
import Settings from '../model/Settings';


class SettingController {
  static  getSettings () {
  let items = Settings.find((err: any, docs:any) => {
    if(!err) {
      return docs;
    }
    else throw new Error("Error 500");
  })
  return items;
  }
  static addSetting(setting: any) {   
    let data = setting['data']
    console.log(data);
     let item = Settings.create(data);
     return item
  }
  static getOneSettings (_id: string) {
     let setting = Settings.findOne({_id: new ObjectId( _id)}, (err: any, docs: any) => {
         if(!err){
          return docs;
         }
         return err;
     });  
    
     return setting;
  }
  static deleteSettings(_id: string) {
     let isDeleted = Settings.findOneAndDelete({_id: _id}, null, (err: any, docs: any) =>{
       if(err)
       {
        throw new Error("document not found or db failed")
       }
       return docs;
     });
     return isDeleted;
    
  }
  /**
   * 
   * @param _id 
   *
   */
  static getPriceForSetting(_id: string) {
    let price = 0;
    let setting = Settings.findOne({_id: new ObjectId( _id)}, (err: any, docs: any) => {
      if(err) {
        throw new Error("document not found or db failed");
      }
    })

  }
  static updateSetting(_id: string, data:any){

  }
}


export default SettingController;