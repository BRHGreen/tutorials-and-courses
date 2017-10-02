const mongoose = require('mongoose');
mongoose.Promise = global.Promise
const graphql = require('graphql');
const User = mongoose.model('user');
const Company = mongoose.model('company');
const UserMeta = mongoose.model('userMeta');
const ContactInfo = mongoose.model('contactinfo');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull
} = graphql

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
})
const UserMetaType = new GraphQLObjectType({
  name: 'UserMeta',
  fields: () => ({
    id: { type: GraphQLID },
    bio: { type: GraphQLString },
    location: { type: GraphQLString }
  })
})
const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    name: { type: GraphQLString },
    description: { type: GraphQLString }
  })
})
const ContactInfoType = new GraphQLObjectType({
  name: 'ContactInfo',
  fields: () => ({
    tel: { type: GraphQLInt },
    email: { type: GraphQLString }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve (parentValue, { id }) {
        return User.findById(id)
      }
    },
    userMeta: {
      type: UserMetaType,
      args: { id: { type: GraphQLID } },
      resolve (parentValue, { id }) {
        return UserMeta.findById(id)
      }
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLID } },
      resolve (parentValue, { id }) {
        return Company.findById(id)
      }
    },
    contactInfo: {
      type: ContactInfoType,
      args: { id: { type: GraphQLID } },
      resolve (parentValue, { id }) {
        return ContactInfo.findById(id)
      }
    }
  })
})

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve (parentValue, args) {
        return new User(args).save()
      }
    },
    addUserMeta: {
      type: UserMetaType,
      args: {
        bio: { type: GraphQLString },
        location: { type: GraphQLString }
      },
      resolve (parentValue, args) {
        return new UserMeta(args).save()
      }
    }
  })
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: mutation
});
