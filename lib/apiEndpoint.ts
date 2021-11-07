import { Construct } from "@aws-cdk/core";
import { HttpApi, HttpMethod } from "@aws-cdk/aws-apigatewayv2";
import { NodejsFunction } from "@aws-cdk/aws-lambda-nodejs";
import {Duration} from "@aws-cdk/core";
import {Runtime} from "@aws-cdk/aws-lambda";
import { PolicyDocument, PolicyStatement, Role, ServicePrincipal } from "@aws-cdk/aws-iam";
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

    const ssmPolicy = new PolicyStatement({
          resources: ["arn:aws:ssm:*:*:parameter/favro-gitlab/*"],
          actions: ["ssm:GetParametersByPath"]
        });

    const handlerLamba = new NodejsFunction(this, `${props.id}Lambda`, {
      memorySize: 1024,
      timeout: Duration.seconds(5),
      runtime: Runtime.NODEJS_14_X,
      handler: "handler",
      entry: props.entry,
    });

    handlerLamba.addToRolePolicy(ssmPolicy)

    const integration = new LambdaProxyIntegration({handler: handlerLamba});

    api.addRoutes({
      path: props.apiPath,
      methods: props.methods,
      integration
    });
  }
}