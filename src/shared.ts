import { SSMClient, GetParametersByPathCommand, GetParametersByPathCommandOutput } from "@aws-sdk/client-ssm";
export enum EnvKeys {
  FAVRO_USER="FAVRO_USER",
  FAVRO_KEY="FAVRO_KEY",
  FAVRO_COMPANY="FAVRO_COMPANY",
  GITLAB_TOKEN = "GITLAB_TOKEN",
  GITLAB_ROOT_BRANCH="GITLAB_ROOT_BRANCH",
  GITLAB_PROJECT_ID="GITLAB_PROJECT_ID",
  GITLAB_API_URL="GITLAB_API_URL"
}

export enum Paths {
  MR_CREATED = "/mrCreated",
  CARD_CREATED = "/cardCreated",
  MERGED_TO = "/mergedTo"
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

export type Stage =  'demo'|'stage'|'prod';

export async function getParams(stage: Stage): Promise<LambdaParams> {
  const ssm = new SSMClient({region: 'eu-north-1'});
  const command = new GetParametersByPathCommand({Path: `/favro-gitlab/${stage}/`, WithDecryption:true, Recursive: true});
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
    fail(err);
  }
}
