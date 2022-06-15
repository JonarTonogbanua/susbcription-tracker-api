import { APIGatewayProxyEventV2 } from "aws-lambda";
import { SubscriptionDelete } from "./action"

export const main = async(event: APIGatewayProxyEventV2) => {
  try {
    const action = new SubscriptionDelete();
    const result = await action.execute(event.pathParameters?.id || "");

    return {
      message: "successfully deleted",
      body: result
    }
  } catch (error) {
    return {
      statusCode: 403,
      error
    }
  }
}