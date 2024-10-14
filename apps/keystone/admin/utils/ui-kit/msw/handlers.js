// src/mocks/handlers.js
import { graphql, HttpResponse } from "msw";

import CampaignQuery from "./cache/CampaignQuery";
import ConstantQuery from "./cache/ConstantQuery";
import ExampleItem from "./cache/ExampleItem";
import ExampleQuery from "./cache/ExampleQuery";
import KeystoneQuery from "./cache/KeystoneQuery";
import RelationshipSelect from "./cache/RelationshipSelect";
import StaticAdminMetaCache from "./cache/StaticAdminMeta";
import TeammateItem from "./cache/TeammateItem";
import TeammateQuery from "./cache/TeammateQuery";

const graphqlEndpoint = graphql.link("http://localhost:6060/api/graphql");

export const handlers = [
  graphqlEndpoint.query("StaticAdminMeta", ({ query }) => {
    return HttpResponse.json(StaticAdminMetaCache);
  }),
  graphqlEndpoint.query("RelationshipSelect", ({ query }) => {
    return HttpResponse.json(RelationshipSelect);
  }),
  graphqlEndpoint.query("CampaignQuery", ({ query }) => {
    return HttpResponse.json(CampaignQuery);
  }),
  graphqlEndpoint.query("TeammateItem", ({ query, variables }) => {
    return HttpResponse.json(TeammateItem);
  }),
  graphqlEndpoint.query("TeammateQuery", ({ query }) => {
    return HttpResponse.json(TeammateQuery);
  }),

  graphqlEndpoint.query("ConstantQuery", ({ query }) => {
    return HttpResponse.json(ConstantQuery);
  }),
  graphqlEndpoint.query("ExampleItem", ({ query }) => {
    return HttpResponse.json(ExampleItem);
  }),
  graphqlEndpoint.query("ExampleQuery", ({ query }) => {
    return HttpResponse.json(ExampleQuery);
  }),

  // Response to all the rest operations (like query("*"))
  graphqlEndpoint.operation(({ query }) => {
    return HttpResponse.json(KeystoneQuery);
  }),
];
