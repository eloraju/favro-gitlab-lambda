import * as lambda from "@aws-cdk/aws-lambda";
import { NodejsFunction } from "@aws-cdk/aws-lambda-nodejs";
import * as cdk from "@aws-cdk/core";
import * as path from "path";
import * as ssm from "@aws-cdk/aws-ssm";
import { EnvKeys } from "../src/helper";

class FavroGitlabLambdaStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const gitlabToken = ssm.StringParameter.valueForStringParameter(
      this,
      `/favro-gitlab/${EnvKeys.GITLAB_TOKEN}`
    );
    const projectId = ssm.StringParameter.valueForStringParameter(
      this,
      `/favro-gitlab/${EnvKeys.GITLAB_PROJECT_ID}`
    );
    const rootBranch = ssm.StringParameter.valueForStringParameter(
      this,
      `/favro-gitlab/${EnvKeys.GITLAB_ROOT_BRANCH}`
    );
    const favroUser = ssm.StringParameter.valueForSecureStringParameter(
      this,
      `/favro-gitlab/${EnvKeys.FAVRO_USER}`,
      1
    );
    const favroKey = ssm.StringParameter.valueForSecureStringParameter(
      this,
      `/favro-gitlab/${EnvKeys.FAVRO_KEY}`,
      1
    );
    const favroCompanyId = ssm.StringParameter.valueForSecureStringParameter(
      this,
      `/favro-gitlab/${EnvKeys.FAVRO_COMPANY}`,
      1
    );

    const favroEnv = {
      [EnvKeys.FAVRO_USER]: favroUser,
      [EnvKeys.FAVRO_KEY]: favroKey,
      [EnvKeys.FAVRO_COMPANY]: favroCompanyId
    };
    const gitlabEnv = {
      [EnvKeys.GITLAB_TOKEN]: gitlabToken,
      [EnvKeys.GITLAB_PROJECT_ID]: projectId,
      [EnvKeys.GITLAB_ROOT_BRANCH]: rootBranch
    };

    const cardAddedHook = new NodejsFunction(this, "cardCreatedHook", {
      memorySize: 1024,
      timeout: cdk.Duration.seconds(5),
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: "cardCreatedHook",
      entry: path.join(__dirname, `/../src/hooks.ts`),
      environment: gitlabEnv
    });

    const mergeRequestCreatedHook = new NodejsFunction(this, "mrCreatedHook", {
      memorySize: 1024,
      timeout: cdk.Duration.seconds(5),
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: "mrCreatedHook",
      entry: path.join(__dirname, `/../src/hooks.ts`),
      environment: favroEnv
    });

    const mergedToHook = new NodejsFunction(this, "mergedToHook", {
      memorySize: 1024,
      timeout: cdk.Duration.seconds(5),
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: "mergedToHook",
      entry: path.join(__dirname, `/../src/hooks.ts`),
      environment: favroEnv
    });
  }
}

const app = new cdk.App();

new FavroGitlabLambdaStack(app, 'favro-gitlab-lambda-stack', {
  stackName: 'favro-gitlab-lambda-stack',
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT
  }
})
