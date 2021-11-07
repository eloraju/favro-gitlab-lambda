import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { getParams, Stage } from "../../shared";
import { GitlabClient } from "../../clients/gitlab.client";

export async function handler(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  const {gitlab: params} = await getParams(event.requestContext.stage as Stage)
  const gitlab = new GitlabClient(params);
  await gitlab.createBranch("someName");

  console.log(JSON.stringify(event));

  return {
    body: JSON.stringify({message: "CreateCardHookHandler called"}),
    statusCode: 200
  };
}
