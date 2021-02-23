import { gql, UserInputError } from 'apollo-server-express';

import dateScalar from './scalar/GraphQLScalarBoolean';



export default gql `
scalar dateScalar
scalar number
   type Subscription {
    _id : ID!
    name: String
    price: number
    dure: String
    createdAt: dateScalar
    updatedAt: dateScalar
   }

   type User {
    _id: ID
    firstname : String
    lastname: String
   }
   
   type Payment{
     _id: ID
    subscriber: String
    date_payment: dateScalar
    createdAt: dateScalar
   }
   type Settings {
    _id: ID!
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
    _id : ID!
    date_start: dateScalar
    date_end: dateScalar
    status: Boolean!
    settings: Settings
    payments: [Payment]
   }

  input userInput {
    firstname : String,
    lastname: String,
  }

   input PaymentInput {
    subscriber: String
    date_payment: dateScalar!
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
    dure: dateScalar
   }

   input inputSubscriber {
    date_start: dateScalar
    date_end: dateScalar
    status: Boolean
   }

   type Query {
     getSubscriptions: [Subscription]
     getOneSubscription(id: String): Subscription
     getSubscribers: [Subscriber]
     getOneSubscriber(id: String): [Subscriber]
     getSettings: [Settings]
     getSettingsBySubscriber(id: String): Settings
     getPriceSubscriber(id: String): number
     getUser(id: String): User
     getUsers: [User]
     getOneSetting(id: String): Settings

   }
   type retunrSubscriber {
     success: Boolean!
     message: String!
     user: User
     subscription: Subscription
   }

   type Mutation {
       createSettings(data: inputSetting): Settings
       updateSettings(id: String, data:inputSetting): Settings!
       deleteSettings(id: String): Boolean!
       createSubscriber(data: inputSubscriber): Boolean!
       updateSubscriber(id: String, data:inputSubscriber): Boolean!
       deleteSubscriber(id: String): Boolean!
       createSubscription(data: inputSubscription): Subscription
       updateSubscription(id: String, data:inputSubscription): Boolean!
       deleteSubscription(id:String): Boolean!
       createUser(data: userInput): User
       deleteUser(id: String): Boolean
       createPayment(data: PaymentInput): Payment
       verifySubcription(id: String) : Boolean
       deseableSubscription(id: String): Boolean
       linkSubscriptionToUser(userId: String, subscriptionId: String, sett: inputSetting): retunrSubscriber!
      
   }
`;

//no-reply@freedocteur.com
//freedocteursn

