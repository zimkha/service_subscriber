import { gql } from 'apollo-server-express';


export default gql `
scalar Date;
   type Subscription {
    id : ID!
    name: String!
    price: Number!
    dure: Date!
    createdAt: Date
    updatedAt: Date
   }
   type Payment{
    status:Boolean,
    date_payment: Date
    date_created: Date
   }

   type Subscriber {
    id : ID!
    date_start: Date
    date_end: Date
    status: Boolean!
    settings: Settings
    payments: [Payment]
   }

 

   type Settings {
    id : ID!
   }
`;