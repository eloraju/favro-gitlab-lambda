import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { getFavroClient} from "../../shared";

export async function handler(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  const favro = await getFavroClient(event);
  await favro.moveCard("someId");

  return {
    body: JSON.stringify({message: "MRCreatedHookHandler called"}),
    statusCode: 200
  };
}
