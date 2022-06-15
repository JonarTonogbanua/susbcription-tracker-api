import { APIGatewayProxyEventV2 } from "aws-lambda";
import { SubscriptionCreate } from "./action"
import validate, { subscriptionCreateRequest } from "./request";

export const main = async(event: APIGatewayProxyEventV2) => {
  try {
    const data = JSON.parse(event?.body || "{}");
    const request: subscriptionCreateRequest = validate(data);
    const action = new SubscriptionCreate();
    const result = await action.execute(request);

    return {
      message: "successfully saved",
      body: result
    }
  } catch (error) {
    return {
      statusCode: 403,
      error
    }
  }
}