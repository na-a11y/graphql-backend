const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLSchema, GraphQLInputObjectType } = require('graphql');
const Booking = require('../models/Booking');

// Booking Type
const BookingType = new GraphQLObjectType({
  name: 'Booking',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    destinationCountry: { type: GraphQLString },
    departureDate: { type: GraphQLString },
    returnDate: { type: GraphQLString },
    classOfService: { type: GraphQLString },
    hotel: { type: GraphQLString },
    airline: { type: GraphQLString },
    additionalInfo: { type: GraphQLString },
  }),
});

// Input type for adding booking
const BookingInputType = new GraphQLInputObjectType({
  name: 'BookingInput',
  fields: {
    title: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    birthDate: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    organization: { type: GraphQLString },
    destinationCountry: { type: GraphQLString },
    departureDate: { type: GraphQLString },
    returnDate: { type: GraphQLString },
    classOfService: { type: GraphQLString },
    hotel: { type: GraphQLString },
    airline: { type: GraphQLString },
    additionalInfo: { type: GraphQLString }
  }
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    bookings: {
      type: new GraphQLList(BookingType),
      resolve(parent, args) {
        return Booking.find({});
      },
    },
  },
});

// Mutation
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addBooking: {
      type: BookingType,
      args: {
        bookingData: { type: BookingInputType }
      },
      resolve(parent, args) {
        let booking = new Booking(args.bookingData);
        return booking.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
