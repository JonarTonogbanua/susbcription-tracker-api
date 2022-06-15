import { APIGatewayProxyEventV2 } from "aws-lambda";
import { SubscriptionReminderUpdate } from "./action"

export const main = async(event: APIGatewayProxyEventV2) => {
  try {
    const action = new SubscriptionReminderUpdate();
    const result = await action.execute(event.pathParameters?.id || "");

    return {
      message: "successfully updated",
      body: result
    }
  } catch (error) {
    return {
      statusCode: 403,
      error
    }
  }
}