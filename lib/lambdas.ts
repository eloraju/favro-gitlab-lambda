import * as lambda from "@aws-cdk/aws-lambda";
import { NodejsFunction } from "@aws-cdk/aws-lambda-nodejs";
import * as cdk from "@aws-cdk/core";
import * as path from "path";
import * as ssm from "@aws-cdk/aws-ssm";
import * as apiGateway from "@aws-cdk/aws-apigatewayv2";
import { HttpMethod } from "@aws-cdk/aws-apigatewayv2";
import { EnvKeys, Paths } from "../src/shared";
import { LambdaProxyIntegration } from '@aws-cdk/aws-apigatewayv2-integrations'

export class FavroGitlabLambdaStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const cardCreatedLambda = new NodejsFunction(this, "CardCreatedHookHandler", {
      memorySize: 1024,
      timeout: cdk.Duration.seconds(5),
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: "cardCreatedHandler",
      entry: path.join(__dirname, `/../src/index.ts`),
    });
    const cardCreatedIntegration = new LambdaProxyIntegration({handler: cardCreatedLambda});

    const mrCreatedLambda =new NodejsFunction(this, "MRCreatedHookHandler", {
      memorySize: 1024,
      timeout: cdk.Duration.seconds(5),
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: "mrCreatedHandler",
      entry: path.join(__dirname, `/../src/index.ts`),
    });
    const mrCreatedIntegration = new LambdaProxyIntegration({handler: mrCreatedLambda});

    const mergedToLambda =new NodejsFunction(this, "MergedToHookHandler", {
      memorySize: 1024,
      timeout: cdk.Duration.seconds(5),
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: "mergedToHandler",
      entry: path.join(__dirname, `/../src/index.ts`),
    });
    const mergedToIntregation = new LambdaProxyIntegration({handler: mergedToLambda});

    const chuckLambda =new NodejsFunction(this, "ChuckHandler", {
      memorySize: 1024,
      timeout: cdk.Duration.seconds(5),
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: "chuckHandler",
      entry: path.join(__dirname, `/../src/index.ts`),
    });
    const chuckIntegration = new LambdaProxyIntegration({handler: chuckLambda});

    const api = new apiGateway.HttpApi(this, "favro-gitlab-hooks-api");

    api.addRoutes({
      path: Paths.CARD_CREATED,
      methods: [HttpMethod.POST],
      integration: cardCreatedIntegration
    });

    api.addRoutes({
      path: Paths.MR_CREATED,
      methods: [HttpMethod.POST],
      integration: mrCreatedIntegration
    });

    api.addRoutes({
      path: Paths.MERGED_TO,
      methods: [HttpMethod.POST],
      integration: mergedToIntregation
    });

    api.addRoutes({
      path: "/chuckJoke",
      methods: [HttpMethod.GET],
      integration: chuckIntegration
    });
  }
}
