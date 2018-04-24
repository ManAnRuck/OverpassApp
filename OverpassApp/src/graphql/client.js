import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";

import { withClientState } from "apollo-link-state";

import resolvers from "./state/resolvers";
import defaults from "./state/defaults";

const cache = new InMemoryCache();

const httpLink = new HttpLink();

const stateLink = withClientState({
  cache,
  resolvers,
  defaults
});

const client = new ApolloClient({
  // By default, this client will send queries to the
  //  `/graphql` endpoint on the same host
  // Pass the configuration option { uri: YOUR_GRAPHQL_API_URL } to the `HttpLink` to connect
  // to a different host
  link: ApolloLink.from([stateLink]),
  cache
});

export default client;
