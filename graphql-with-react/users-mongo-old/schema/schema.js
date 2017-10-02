const graphql = require('graphql')
const mongoose = require('mongoose')
const Users = mongoose.model('users')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull
} = graphql

// This is the usertype. It should be moved to another file down the line
const UserType = new GraphQLObjectType({
  name: 'Users',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    companyId: { type: GraphQLString }
  })
})

// This is the rootquery type
const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    users: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve: (parentValue, { id }) => {
        return Users.findById(id)
        }
      }
    })
  })


module.exports = new GraphQLSchema({
  query: RootQueryType
})
