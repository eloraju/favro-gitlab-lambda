import { SSMClient, GetParametersByPathCommand, GetParametersByPathCommandOutput } from "@aws-sdk/client-ssm";
import { ChuckClient } from "./clients/chuck.client";
import { GitlabClient } from "./clients/gitlab.client";
import { FavroClient } from "./clients/favro.client";
import { APIGatewayProxyEventV2 } from "aws-lambda";

export enum Paths {
  MR_CREATED = "/mrCreated",
  CARD_CREATED = "/cardCreated",
  MERGED_TO = "/mergedTo",
  ORG_INFO = "/orgInfo",
  CHUCK = "/chuckJoke"
}

export interface FavroClientParams {
  user: string;
  key: string;
  orgId: string;
}

export interface GitLabClientParams {
  token: string;
  rootBranch: string;
  projectId: string;
  url: string;
}

export interface LambdaParams {
  favro: FavroClientParams;
  gitlab: GitLabClientParams;
}

export type Stage =  '$default'|'demo'|'stage'|'prod';

export async function getGitLabClient(event: APIGatewayProxyEventV2): Promise<GitlabClient> {
  const params = await getParams(event.requestContext.stage as Stage || "demo");
  return new GitlabClient(params.gitlab);

}

export async function getFavroClient(event: APIGatewayProxyEventV2): Promise<FavroClient> {
  const params = await getParams(event.requestContext.stage as Stage || "demo");
  return new FavroClient(params.favro);

}

export async function getParams(stage: Stage): Promise<LambdaParams> {
  const ssm = new SSMClient({region: 'eu-north-1'});
  const command = new GetParametersByPathCommand({Path: `/favro-gitlab/${stage === "$default" ? "demo": stage}/`, WithDecryption:true, Recursive: true});
  try {
    const result: GetParametersByPathCommandOutput = await ssm.send(command);
    return result.Parameters.reduce((acc, param)=>{;
      const [_, service, key] = /\/([a-zA-Z]+)\/([a-zA-Z]+)$/.exec(param.Name);
      // @ts-ignore
      acc[service][key as string] = param.Value;
      return acc;
    }, {favro: {}, gitlab: {}}) as LambdaParams;
  } catch (err) {
    console.log(err)
  }
}
