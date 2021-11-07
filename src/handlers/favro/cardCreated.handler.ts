import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { getGitLabClient } from "../../shared";

export async function handler(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  const gitlab = await getGitLabClient(event);
  await gitlab.createBranch("someName");

  return {
    body: JSON.stringify({message: "CreateCardHookHandler called"}),
    statusCode: 200
  };
}
