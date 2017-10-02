const express = require('express');
const expressGraphQL = require('express-graphql');
// const schema = require('./schema/schema');

const app = express();

//grabbing the schema from schema.js
app.use('/graphql', expressGraphQL({
  
  graphiql: true
}))

app.listen(4000, () => {
  console.log('Listening');
})
