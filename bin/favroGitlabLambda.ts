import * as cdk from "@aws-cdk/core";
import { FavroGitlabLambdaStack } from "../lib/lambdas";

const app = new cdk.App();


new FavroGitlabLambdaStack(app, 'favro-gitlab-lambda-stack', {
  stackName: 'favro-gitlab-lambda-stack',
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT
  }
})
