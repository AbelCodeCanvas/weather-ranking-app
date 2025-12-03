import { ApolloServer } from 'apollo-server';
import { readFileSync } from 'fs';
import { join } from 'path';
import { rankingResolver } from './resolvers/rankingResolver';

const typeDefs = readFileSync(
  join(__dirname, 'schema/schema.graphql'),
  'utf-8'
);

const server = new ApolloServer({
  typeDefs,
  resolvers: rankingResolver,
  context: ({ req }) => ({
    // You could add authentication context here
  }),
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
