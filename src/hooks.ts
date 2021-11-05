import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { GitlabClient, FavroClient } from "./clients";

const gitlab = new GitlabClient();
const favro = new FavroClient();

export async function cardCreatedHook(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  await gitlab.createBranch("someName");
  return {
    body: "Nom",
    statusCode: 200
  };
}

export async function mrCreatedHook(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  await favro.moveCard("someId");
  return {
    body: "Nom",
    statusCode: 200
  };
}

export async function mergedToHook(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  await favro.moveCard("someId");
  await favro.updateReleased("someId");
  return {
    body: "Nom",
    statusCode: 200
  };
}
