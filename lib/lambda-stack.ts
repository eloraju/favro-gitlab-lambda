import * as lambda from "@aws-cdk/aws-lambda";
import { NodejsFunction } from "@aws-cdk/aws-lambda-nodejs";
import * as cdk from "@aws-cdk/core";
import * as path from "path";
import * as apiGateway from "@aws-cdk/aws-apigatewayv2";
import { HttpMethod } from "@aws-cdk/aws-apigatewayv2";
import { Paths } from "../src/shared";
import { LambdaProxyIntegration } from "@aws-cdk/aws-apigatewayv2-integrations";
import { ApiEndpoint } from "./apiEndpoint";
import { handlers } from "./handlerProps";

export class FavroGitlabLambdaStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new apiGateway.HttpApi(this, "favro-gitlab-hooks-api");

    // GitLab hooks and endpoints
    new ApiEndpoint(this, api, handlers.mergedTo);
    new ApiEndpoint(this, api, handlers.mrCreated);

    // Favro hooks and endpoints
    new ApiEndpoint(this, api, handlers.cardCreated);
    new ApiEndpoint(this, api, handlers.orgInfo);

    new ApiEndpoint(this, api, handlers.chuck);
  }
}
