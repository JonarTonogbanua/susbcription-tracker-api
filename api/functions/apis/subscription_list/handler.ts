import { APIGatewayProxyEventV2 } from "aws-lambda";
import { SubscriptionList } from "./action"

export const main = async(event: APIGatewayProxyEventV2) => {
  try {
    const action = new SubscriptionList();
    const result = await action.execute();

    return {
      message: "successfully retrieved",
      body: result
    }
  } catch (error) {
    return {
      statusCode: 404,
      error
    }
  }
}