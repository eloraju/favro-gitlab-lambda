import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { getFavroClient, getGitLabClient } from "../../shared";

export async function handler(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  const gitlab = await getGitLabClient(event);
  const name = await gitlab.getProjectName();

  return {
    body: `Connected to project with name: ${name}`,
    statusCode: 200
  };
}
