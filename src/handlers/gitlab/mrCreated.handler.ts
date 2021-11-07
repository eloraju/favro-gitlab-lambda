import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { getParams, Stage } from "../../shared";
import { FavroClient } from "../../clients/favro.client";

export async function handler(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  const {favro: params} = await getParams(event.requestContext.stage as Stage)
  const favro = new FavroClient(params);
  await favro.moveCard("someId");

  console.log(JSON.stringify(event));

  return {
    body: JSON.stringify({message: "MRCreatedHookHandler called"}),
    statusCode: 200
  };
}
