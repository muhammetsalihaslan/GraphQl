import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql
  type Book {
    id : ID!
    title: String!
    author:Author
    score: Float
    isPublished: Boolean
  }

  type Author{
    id:ID!
    name: String!
    surname: String
    age: Int
  }

  type Query {
    books: [Book]
    author: [Author]
  }
`; //type yapılarını belirledik
const author = {
  id: "1",
  name: "Albert",
  surname: "Camus",
  age: "50",
};

const books = [
  {
    id: "makajsns",
    title: "The Awakening",
    author,
    score: 6.9,
    isPublished: true,
  },
  {
    id: "bdnhdbd",
    title: "City of Glass",
    author,
  },
];

const resolvers = {
  Query: {
    books: () => books,
    author: () => author,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
}); // server ayağa kaldırıldı

const { url } = await startStandaloneServer(server, {
  listen: { port: 3000 },
});

console.log(`🚀  Server ready at: ${url}`);
