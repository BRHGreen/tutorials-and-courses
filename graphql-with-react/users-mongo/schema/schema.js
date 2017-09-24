const graphql = require('graphql')
const mongoose = require('mongoose')
const User = mongoose.model('user')

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
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
})

// This is the rootquery type
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        user.findById(args, (err, user) => {
          if (err) return err
          return User.findById({ id })
        })
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
