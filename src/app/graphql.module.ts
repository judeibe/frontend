import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache, NormalizedCacheObject} from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';

const uri = 'http://localhost:1337/graphql'; // <-- add the URL of the GraphQL server here

export function createApollo(httpLink: HttpLink): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    link: httpLink.create({uri}),
    cache: new InMemoryCache(),
  });
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
