import { ObjectId } from 'mongodb'
import User from '../model/User';




class UserController {
    static getUsers () {
      let users  = User.find(( err, docs) => {
        if(err){
          throw new Error('Error on fetching orders');
      }
      return docs;
      });
      return users;
    }
    static getOneUser (_id: string) {
      return User.findById(new ObjectId(_id));
    }
    static register (dateUser: any) {
       try {
     console.log(dateUser['data'])
     let data = dateUser['data'];
     let user = User.create(data);
     if(user){
      return user;
    }
        throw new Error("erreur l'or de l'enregistrement");
       } catch (error) {
         throw new Error(error)
       }
    }
}

export default UserController;