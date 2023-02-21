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
    book(id : ID):Book!
    authors: [Author]
  }
`; //type yapılarını belirledik
const authors = [
  {
    id: "1",
    name: "Albert",
    surname: "Camus",
    age: "50",
  },
];

const books = [
  {
    id: "2",
    title: "The Awakening",
    author: authors[0],
    score: 6.9,
    isPublished: true,
  },
  {
    id: "3",
    title: "City of Glass",
    author: authors[0],
  },
];

const resolvers = {
  Query: {
    books: () => books,
    book: (parent, args) => {
      const data = books.find((book) => book.id === args.id);
      return data;
    },
    authors: () => authors,
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
