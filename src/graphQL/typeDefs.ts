import { gql } from 'apollo-server-express';
const { GraphQLScalarType, Kind } = require('graphql');



export default gql `
scalar Date
scalar number
   type Subscription {
    id : ID!
    name: String!
    price: number!
    dure: Date!
    createdAt: Date
    updatedAt: Date
   }
   
   type Payment{
    status:Boolean,
    date_payment: Date
    date_created: Date
   }
   type Settings {
    id : ID!
    organize_your_agenda: Boolean!
    confirm_appointment_requests: Boolean!
    consult_the_health_record: Boolean!
    reminder_email: Boolean!
    reminder_sms: Boolean!
    give_consultation_note: Boolean!
    prescription_editing: Boolean!
    appointment_notification_sms :Boolean!
    billing_sms: Boolean!
   }

   type Subscriber {
    id : ID!
    date_start: Date
    date_end: Date
    status: Boolean!
    settings: Settings
    payments: [Payment]
   }

  

   input PaymentInput {
    status:Boolean!
    date_payment: Date!
    date_created: Date!
   }
   input inputSetting{
    organize_your_agenda: Boolean
    confirm_appointment_requests: Boolean
    consult_the_health_record: Boolean
    reminder_email : Boolean
    reminder_sms: Boolean
    give_consultation_note: Boolean
    prescription_editing: Boolean
    appointment_notification_sms: Boolean
    billing_sms: Boolean
   }

   input inputSubscription {
    name: String!
    price: number!
    dure: Date
    createdAt: Date
    updatedAt: Date
   }

   input inputSubscriber {
    date_start: Date
    date_end: Date
    status: Boolean
   }

   type Query {
   
     getSubscriptions: [Subscription]
     getOneSubscription(id: String): [Subscription]
     getSubscribers: [Subscriber]
     getOneSubscriber(id: String): [Subscriber]
     getSettings: [Settings]!
     getSettingsBySubscriber(id: String): Settings
     getPriceSubscriber(id: String): number

   }

   type Mutation {
       createSettings(data: inputSetting): Boolean
       updateSettings(id: String, data:inputSetting): [Settings]!
       deleteSettings(id: String): Boolean!

       createSubscriber(data: inputSubscriber): Boolean!
       updateSubscriber(id: String, data :inputSubscriber): Boolean!
       deleteSubscriber(id: String): Boolean!

       createSubscription(data: inputSubscription): Subscription!
       updateSubscription(id: String, data:inputSubscription): Boolean!
       deleteSubscription(id:String): Boolean!
   }

`;

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value:any) {
    return value.getTime(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value:any) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast:any ) {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10); // Convert hard-coded AST string to type expected by parseValue
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});