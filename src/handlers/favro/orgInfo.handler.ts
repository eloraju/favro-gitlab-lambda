import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { getParams, Stage } from "../../shared";
import { GitlabClient } from "../../clients/gitlab.client";
import { FavroClient } from "../../clients/favro.client";

export async function handler(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  const {favro: params} = await getParams(event.requestContext.stage as Stage)
  const favroClient = new FavroClient(params);
  const res = await favroClient.getOrgInfo();

  return {
    body: res,
    statusCode: 200
  };

}
