import { gql } from 'apollo-server-express';


export default gql `
scalar Date;
   type Subscription {
    id : ID!

   }

   type Subscriber {
    id : ID!
   }

   type Settings {
    id : ID!
   }
`;