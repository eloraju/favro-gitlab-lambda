import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { getFavroClient } from "../../shared";

export async function handler(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  console.log(`DEBUG: ${JSON.stringify(event)}`)

  const favroClient = await getFavroClient(event);
  const res = await favroClient.getOrgInfo();

  return {
    body: res,
    statusCode: 200
  };

}
