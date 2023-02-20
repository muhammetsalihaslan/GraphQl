import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql
  type Book {
    id : ID!
    title: String!
    author: String
    score: Float
    isPublished: Boolean
  }

  type Query {
    books: [Book]
  }
`; //type yapılarını belirledik

const books = [
  {
    id: "makajsns",
    title: "The Awakening",
    author: "Kate Chopin",
    score: 6.9,
    isPublished: true,
  },
  {
    id: "bdnhdbd",
    title: "City of Glass",
    author: "Paul Auster",
  },
];

const resolvers = {
  Query: {
    books: () => books,
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
