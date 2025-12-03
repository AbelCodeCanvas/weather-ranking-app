import { ApolloServer } from 'apollo-server';
import { readFileSync } from 'fs';
import { join } from 'path';
import { rankingResolver } from './resolvers/rankingResolver';

// Read GraphQL schema
const typeDefs = readFileSync(
  join(__dirname, 'schema/schema.graphql'),
  'utf-8'
);

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers: rankingResolver,
  introspection: true, // Enable for development
  formatError: (error) => {
    console.error('GraphQL Error:', error);
    return {
      message: error.message,
      locations: error.locations,
      path: error.path
    };
  }
});

// Start server
const PORT = process.env.PORT || 4000;

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀 Weather Ranking Server ready at ${url}`);
  console.log(`📡 GraphQL endpoint: ${url}graphql`);
}).catch((error) => {
  console.error('Failed to start server:', error);
});
