import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { getFavroClient } from "../../shared";

export async function handler(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  const favroClient = await getFavroClient(event);
  const res = await favroClient.getOrgInfo();

  return {
    body: `Currently selected organization ID points to organization with name: ${res.name}`,
    statusCode: 200
  };

}
