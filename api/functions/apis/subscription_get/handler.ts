import { APIGatewayProxyEventV2 } from "aws-lambda";
import { SubscriptionGet } from "./action"

export const main = async(event: APIGatewayProxyEventV2) => {
  try {
    const action = new SubscriptionGet();
    const result = await action.execute(event.pathParameters?.id || "");

    return {
      message: "successfully retrieved",
      body: result
    }
  } catch (error) {
    return {
      statusCode: 404
    }
  }
}