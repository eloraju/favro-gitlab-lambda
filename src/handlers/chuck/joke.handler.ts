import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { ChuckClient } from "../../clients/chuck.client";

export async function chuckHandler(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  const chuck = new ChuckClient();
  return {
    body: JSON.stringify(await chuck.getRandomJoke()),
    statusCode: 200
  };
}