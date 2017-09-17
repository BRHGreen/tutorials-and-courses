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

//The order in which you define the types is important as UserType makes use of CompanyType
const CompanyType = new GraphQLObjectType({
  name: 'Company',
    //because CompanyType has a relationship between itself and users and because we calling users before it is defined within the CompanyType we need to wrap the `fields` in a function
    fields: () => ({
      id: { type: GraphQLString },
      name: { type: GraphQLString },
      description: { type: GraphQLString },
      //This is where we set up the relationship between companies and users. There are likely to be many users asociated with any one company so in the `type` here we need to tell gql to expect a list, like so:
      users: {
        //we can fetch all of the users asociated with a company (and vise versa) only because we put a company ID on each one of our users in db.json
        type: new GraphQLList(UserType),
        //note the absence of args here because we are not fectching any new data.
        resolve(parentValue, args) {
          return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`)
            .then(resp => resp.data)
        }
      }
    })
})

//tells graphql what the user object looks like
const UserType = new GraphQLObjectType({
  name: 'User',
    fields: () => ({
      id: { type: GraphQLString },
      firstName: { type: GraphQLString },
      age: { type: GraphQLInt },
      //here we a relating a user to a company by pulling in the CompanyType defined above.
      company: {
        type: CompanyType,
        //because we are grabbing data from elsewhere here, we need a resolve function.
        resolve(parentValue, args) {
          //here you can console.log the parentValue and args(it will print out int the terminal). The parentValue is the CompanyType
          console.log('parentValue: ',parentValue, 'args: ', args);
          //here we are making a query to our DB. It will return all of the values, on the company userType so you can query any of these values.
          return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
            .then(resp => resp.data)
        }
      }
  })
})

//The RootQuery is ESSENTIAL and required for graphql to know how to jump into your DB and grab the specific data you're after.
// The `fields` parameter is what tells gql which TYPES it'll be able to fetch for you.
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // fields on here allow us to access to data from the type directly. e.g. if we didn't have a company defined on here we wouldn't be able to access data from CompanyType
    user: {
      type: UserType,
      //here we are saying that if you are looking for a user and you provide an ID we'll go grab it for you and return a string
      args: { id: { type: GraphQLString } },
      //The resolve function is then called and tries to return your info
      //parentValue: not really used a lot, just whack it in
      //args: should return the populated data specified in the args value
      resolve (parentValue, args) {
        return  axios.get(`http://localhost:3000/users/${args.id}`)
          .then(resp => resp.data)
        }
      },
      company: {
        type: CompanyType,
        args: { id: { type: GraphQLString } },
        resolve (parentValue, args) {
          return axios.get(`http://localhost:3000/companies/${args.id}`)
            .then(resp => resp.data)
        }
      }
    }
  })

  // When we work with mutations as opposed to queries, we have to create a whole new object
  const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
      // Watch this space. In this case we are going to be adding a user which conforms to our UserType but when it comes to mutations this won't necessarily always be the case.
    addUser: {
      type: UserType,
      // Here we are specifiying the information we expect to get back from our mutation. You can specify here as to whether or not is required by using GraphQLNonNull
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        componyId: { type: GraphQLString }
      },
      // in a mutation the resolve function is where we actually add the information to the DB
      resolve(parentValue, { firstName, age }) {
        return axios.post('http://localhost:3000/users', { firstName, age })
          .then(res => res.data)
      }
    },
    deleteUser: {
          type: UserType,
          args: {
            id: { type: new GraphQLNonNull(GraphQLString) }
          },
          resolve(parentValue, { id }) {
            return axios.delete(`http://localhost:3000/users/${id}`)
              .then(res => res.data)
          }
        },
        editUser: {
          type: UserType,
          args: {
            id: { type: new GraphQLNonNull(GraphQLString) },
            firstName: { type: GraphQLString },
            age: { type: GraphQLInt },
            componyId: { type: GraphQLString }
          },
          resolve(parentValue, args) {
            return axios.patch(`http://localhost:3000/users/${args.id}`, args)
              .then(res => res.data)
          }
        }
  }
})



module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
})
