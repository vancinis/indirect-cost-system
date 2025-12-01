import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client/core";
import { ApolloProvider } from "@apollo/client/react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/graphql";

const httpLink = new HttpLink({
  uri: API_URL,
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          operationsByPlant: {
            // Merge para evitar conflictos de cache
            merge(_, incoming) {
              return incoming;
            },
          },
        },
      },
      Plant: {
        keyFields: ["id"],
      },
      Operation: {
        keyFields: ["id"],
      },
      IndirectCost: {
        keyFields: ["id"],
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
      errorPolicy: "all",
    },
    query: {
      fetchPolicy: "cache-first",
      errorPolicy: "all",
    },
    mutate: {
      errorPolicy: "all",
    },
  },
});

export { ApolloProvider };
