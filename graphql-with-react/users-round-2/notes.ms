other stuff

you can name your queries. like so:
(it is useful when you've got a load of different queries in the front end and you can call them by name)

  query findCompany{
    company(id: "1") {
      name
      users {
        id
      }
    }
  }

  You can use the same query twice but you need to give it a key like so:

  {
    apple: company(id: "1") {
      name
      users {
      id
      name
      description
      }
    }
    google: company(id: "1") {
      name
      users {
      id
      name
      description
      }
    }
  }

  With the above you could also use a query fragment like so:

  fragment companyDetails on Company {
    id
    name
    description
  }
  and then include the fragment in the queries like so:

  {
      apple: company(id: "1") {

          ...companyDetails
      }
      google: company(id: "2") {

          ...companyDetails
      }
  }
