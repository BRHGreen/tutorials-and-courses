#learning graphQL notes

YOU HAVE TO USE DOUBLE QUOTES WHEN BUILDING QUERIES IN graphQL

##1.1
GraphQL was developed at Facebook from 2012 and was made open source in 2015. It is often talked about as being part of React or Javascript but, while it lends itself well to loading data into React components (as one would expect) it is just a query language and is not opinionated about which language you use to implement a *Graph Server*.

##1.2
When we talk about GraphQL we often compare it to REST (which stands for representational state transfer) is the most common way to access API's. There are variations on how one uses REST but typically we'll request or update sources on different URI's. This can get out of hand pretty quickly as you start creating different endpoints for your get requests. If you have an API "Shoreditch" and you want to find out where Shoreditch is, that's one easy request. If you want to find out where can I get a decent cup of single origin Etheopian filter coffee in Shoreditch. This may require a custom endpoint and could result in requesting data such as location off Shoreditch, locations of coffeeshops within this area, coffeeshops which sell filter coffee, coffeeshops which sell Etheopian coffee, blah, blah...basically you end up requesting a load of data which you don't actually need and this can slow you down.

##1.3
One of the biggest companies to use a GraphQL API is GitHub. If you head [here](https://developer.github.com/early-access/graphql/explorer/) then you can query the github api using graph_i_QL. You can enable graph_i_QL on your own projects too.
GraphQL queries look a lot like json without the values. Assuming you have built your query correctly the data which will be returned will effectively add the values to your keys (as it were). This is a picture of a simple query in graphQL explorer: [graphQL explorer](./images/graphql-explorer-screenshot.png)

##1.4
When using graph_i_QL interface there are a few handy autocomplete bits going on when you start typing. You can also use `ctrl + space` to give you a list of all of the data which is available to you on which ever database you are querying.

##1.5
So the most basic kind of query will look something like this:
```
{
  viewer {
    name
  }
}
```
and will return something like this:
```
{
  "data": {
    "viewer": {
      "name": "Benedict Green"
    }
  }
}
```
But of course it gets much more in depth than this. The next step is to start using arguments in the queries (some of which may be required and some of which will not) which will look something like this:
```
{
  repository(name: "graphql", owner: "facebook") {
    id
    description
    homepageURL
  }
}
```
and will return something which looks like this:
```
{
  "data": {
    "repository": {
      "id": "MDEwOlJlcG9zaXRvcnkzODM0MjIyMQ==",
      "description": "GraphQL is a query language and execution engine tied to any backend service.",
      "homepageURL": "http://facebook.github.io/graphql/"
    }
  }
}
```

##3.1
The way that the above fields are set up is determined by the GraphQL schema. Whats good about using the GraphQL explorer is that you can hit the docs tab on the right and it will show you the schema.

##3.2
As with other schemas the GraphQL schema requires you to set each value to expect a certain datatype. The possible datatypes are: Integers, Floats, Strings, Booleans, Null, Enums, Lists, and Objects (you can see all of the datatypes for different fields in the GraphQL schema). If you see bang (!) next to the datatype then this indicates that it is required.
GraphQL is __SELF DOCUMENTING__. When we define the schema the documentation is created automatically.

##3.3
In addition to the build in documentation you can also query the schema directly. This is useful when we're working outside of the graphical interface.
Such a query may look like this:
```
#here we are drilling down into the schema to get some useful data. In #particular the `isDeprecated` and `deprecationReason` are cool as will mean #that you can keep up to date with updates etc.
{
 __schema {
   queryType {
     name
     description
     fields {
       name
       description
       isDeprecated
       deprecationReason
     }
   }
 }
}
```

##4.1
GraphQL will not let you ask for the same data more than once in the same query. For example if you wanted to query a repo for info on React and on GraphQL the argument for the owner of the repo would both be `Facebook` but if you try to write a query like this...
```
{
  repository(name: "graphql", owner: "facebook") {
    id
    description
    homepageURL
  }
  repository(name: "react", owner: "facebook") {
    id
    description
    homepageURL
  }
}
```
...then it will error. What you need to do instead is create an alias like so:
```
{
  graphqlProject: repository(name: "graphql", owner: "facebook") {
    id
    description
    homepageURL
  }
  reactProject: repository(name: "react", owner: "facebook") {
    id
    description
    homepageURL
  }
}
```
*note* using aliases messes up the auto complete thing a bit. You may have to look at the schema to see which fields are available for you to query.

##4.2
I you are querying lots of the same fields from different locations using different queries you can do this using fragments (these are kind of like variables which you can reference inside your queries). So instead of doing what we have done in the above examples you could do something like this:
```
{
  graphqlProject: repository(name: "graphql", owner: "facebook") {
    ...repoFields
  }
  reactProject: repository(name: "react", owner: "facebook") {
    ...repoFields
  }

  frragment repoFields on Repository {
    id
    description
    homepageURL
  }
}
```

##4.3
The next level to GraphQL is `edges`. This is something which is automatically created in your query if you request a field which indicates that there is some kind of connection to another array of data. So if you write this:
```
{
  viewer {
    id
    name
    repositories
  }
}

```
 and hit `play`, then your query will turing into something which looks like this:
 ```
 {
  viewer {
    id
    name
    repositories(first: 5) { #we had to put an argument here so that it doesn't error. In this case we are only displaying the first 5 repos.
      edges {
        node {
          id
          name #you can add fields to this yourself. `id` was created for us but we added `name`
        }
      }
    }
  }
}
```
##4.4
So this is GraphQL's way of handling joining tables. Instead of the value of each key being and integer or sting or whatever, it can also contain access to a whole other load of data. This is something which is familiar from plain old SQL, it's just GraphQL's way of handling it. Have a look at the video for this lesson for more detail.

##4.5
There are various ways to paginate results. We've looked at 'first' and 'last' in previous examples but there are a number of optional arguments you can include. In order to see what arguments are available for you to use you can look at the schema. For this query...
```
{
  repository(name: "graphql", owner: "facebook") {
    id
    issues (last: 5, states: OPEN) {
      edges {
        node {
          id
        }
      }
    }
  }
}

```
...we are filtering the last 5 results and also whether or not the status of a repo is open or not. So if, in the docs, go and find repository you'll see that `issues`' value looks like this: `issues(first: Intafter: Stringlast: Intbefore: Stringstates: [IssueState]labels: [String!]): IssueConnection!`
So these can all be used as arguments.
