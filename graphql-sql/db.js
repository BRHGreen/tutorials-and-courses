import Sequalize from 'sequalize'
import _ from 'lodash'
import Faker from 'faker'

const con = new Sequalize(
  'relay',
  'postgres',
  'postgres'
  {
    dialect: 'postgres',
    host: 'localhost'
  }
)

// these constants are defining tables within postgres
// we'll be using the postgres ORM (object relational mapper)
const Person = Conn.define('perosn', {
  firstName: {
    type: Sequalize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequalize.STRING,
    allowNull: false
  },
  email: {
    type: Sequalize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
})

const Post = Conn.define('post', {
  title: {
    type: Sequalize.STRING,
    allowNull: false
  },
  content: {
    type: Sequalize.STRING,
    allowNull: false
  }
})

// relationships:
Person.hasMany(Post);
Post.belongsTo(Person);

// using `force` here overwrites the tables if we already have tabels with the names which we are trying to insert
Conn.sypc({force: true}).then(() => {
  _.times(10, () => {
    return Person.create({
      firstName: Faker.name.firstName(),
      lastName: Faker.name.lastName(),
      email: Faker.internet.email()
    }).then(person => {
      return person.createPost({
        title: `Title One by ${person.firstName}`,
        content: 'This is a test article'
      })
    })
  })
})

export default Conn
