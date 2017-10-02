export default {
  Query: {
    allCats: async (parent, args, { Cat }) => {
      // id will look like this: { _id: 3239427, name: 'blah' } so we want to make it into a string
      const cats = await Cat.find()
      return cats.map((x) => {
        x._id = x._id.toString()
        return x
      })
    },
  },

  Mutation: {
    createCat: async (parent, args, { Cat }) => {
      const kitty = await new Cat(args).save()
      return cats.map((x) => {
        kitty._id = kitty._id.toString()
        return kitty
      })
    },
  },
}
