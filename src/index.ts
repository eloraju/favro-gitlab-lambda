import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { GitlabClient, FavroClient, ChuckClient } from "./clients";

export async function cardCreatedHandler(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  const gitlab = new GitlabClient();
  await gitlab.createBranch("someName");

  console.log(JSON.stringify(event));

  return {
    body: JSON.stringify({message: "CreateCardHookHandler called"}),
    statusCode: 200
  };
}

export async function mrCreatedHandler(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  const favro = new FavroClient();
  await favro.moveCard("someId");

  console.log(JSON.stringify(event));

  return {
    body: JSON.stringify({message: "MRCreatedHookHandler called"}),
    statusCode: 200
  };
}

export async function mergedToHandler(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  const favro = new FavroClient();
  await favro.moveCard("someId");
  await favro.updateReleased("someId");

  console.log(JSON.stringify(event));

  return {
    body: JSON.stringify({message: "MergedToHookHandlerCalled"}),
    statusCode: 200
  };
}

export async function chuckHandler(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {

  const chuck = new ChuckClient();

  return {
    body: JSON.stringify(await chuck.getRandomJoke()),
    statusCode: 200
  };
}