api -
- has endpoints and domains
- within the api you are able to see which methods are available to you within
each endpoint.
- handler.js is the first thing which the endpoint hits. Within this there are methods which are available for you to use (I think?)
- "invoke" is separate from http requests which operate internally
- Enum (short for enumeration) you need to define it in the model. Enum is a datatype. Look up Enum on swift.
- relational mapping: Need to go to objection.js
- Underscores and camelCase is objection.js: be careful when querying the database. Underscores/camelCase is not consistant on either end.
objection.js is an ORM (like mongoose for mongo). KNEX is a library which objection.js queries.

Research
- decorators
- paranoia delete/ soft delete
- Callbacks vs promises
-
