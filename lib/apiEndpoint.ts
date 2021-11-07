import { Construct } from "@aws-cdk/core";
import { HttpApi, HttpMethod } from "@aws-cdk/aws-apigatewayv2";
import { NodejsFunction } from "@aws-cdk/aws-lambda-nodejs";
import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import path from "path";
import { LambdaProxyIntegration } from "@aws-cdk/aws-apigatewayv2-integrations";
import { Paths } from "../src/shared";

export interface ApiEndpointProps {
  id: string,
  entry: string,
  apiPath: Paths,
  methods: HttpMethod[],
}

export class ApiEndpoint extends Construct {
  constructor(scope: Construct, api: HttpApi, props: ApiEndpointProps) {
    super(scope, props.id);

    const handlerLamba = new NodejsFunction(this, `${props.id}Lambda`, {
      memorySize: 1024,
      timeout: cdk.Duration.seconds(5),
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: "handler",
      entry: props.entry
    });

    const integration = new LambdaProxyIntegration({handler: handlerLamba});

    api.addRoutes({
      path: props.apiPath,
      methods: props.methods,
      integration
    });
  }
}