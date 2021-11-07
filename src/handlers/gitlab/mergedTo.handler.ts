import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { getFavroClient} from "../../shared";

export async function handler(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  const favro = await getFavroClient(event);
  await favro.moveCard("someId");
  await favro.updateReleased("someId");

  console.log(JSON.stringify(event));

  return {
    body: JSON.stringify({message: "MergedToHookHandlerCalled"}),
    statusCode: 200
  };
}
