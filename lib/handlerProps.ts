import apiPath from "path";
import { Paths } from "../src/shared";
import { HttpMethod } from "@aws-cdk/aws-apigatewayv2";
import { ApiEndpointProps } from "./apiEndpoint";

const HandlerPaths  = {
  gitlab: apiPath.join(__dirname, "../src/handlers/gitlab"),
  favro: apiPath.join(__dirname, "../src/handlers/favro"),
  chuck: apiPath.join(__dirname, "../src/handlers/chuck")
}

export const handlers: {[name: string]: ApiEndpointProps} = {
  mrCreated: {
    // GitLab
    id: "MRCreatedHandler",
    entry: `${HandlerPaths.gitlab}/mrCreated.handler.ts`,
    apiPath: Paths.MR_CREATED,
    methods: [HttpMethod.POST]
  },
  mergedTo: {
    id: "MergedToHandler",
    entry: `${HandlerPaths.gitlab}/mergedTo.handler.ts`,
    apiPath: Paths.MERGED_TO,
    methods: [HttpMethod.POST]
  },
  checkProject: {
    id: "CheckProjectHandler",
    entry: `${HandlerPaths.gitlab}/checkProject.handler.ts`,
    apiPath: Paths.CHECK_PROJECT,
    methods: [HttpMethod.GET]
  },

  // Favro
  cardCreated: {
    id: "CardCreatedHandler",
    entry: `${HandlerPaths.favro}/cardCreated.handler.ts`,
    apiPath: Paths.CARD_CREATED,
    methods: [HttpMethod.POST]
  },
  orgInfo: {
    id: "OrgInfoHandler",
    entry: `${HandlerPaths.favro}/orgInfo.handler.ts`,
    apiPath: Paths.ORG_INFO,
    methods: [HttpMethod.GET]
  },

  // Chuck
  chuck: {
    id: "ChuckHandler",
    entry: `${HandlerPaths.chuck}/joke.handler.ts`,
    apiPath: Paths.CHUCK,
    methods: [HttpMethod.GET]
  },

  // Other
  ping: {
    id: "PingHandler",
    entry: apiPath.join(__dirname, "../src/handlers/ping.handler.ts"),
    apiPath: Paths.PING,
    methods: [HttpMethod.GET, HttpMethod.POST]
  },
};