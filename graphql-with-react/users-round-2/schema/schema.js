const axios = require ('axios')
const graphql = require('graphql');
//schema provides all of the code needed to structure you DB such as which fields are expected for objects in your DB and what the relationships between the differnt tables are.


const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = graphql

//tells graphql what the user object looks like
const UserType = new GraphQLObjectType({
  name: 'User',
    fields: {
      id: { type: GraphQLString },
      firstName: { type: GraphQLString },
      age: { type: GraphQLInt }
  }
})

//The RootQuery is ESSENTIAL and required for graphql to know how to jump into your DB and grab the specific data you're after.
// The `fields` parameter is what tells gql which TYPES it'll be able to fetch for you.
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/users/${args.id}`)
          .then(resp => resp.data)
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
})
