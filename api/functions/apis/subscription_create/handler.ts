import { APIGatewayProxyEventV2 } from "aws-lambda";
import { THROW_API_ERROR, API_SUCCESS } from "../../../libs/Response";
import { SubscriptionCreate } from "./action"
import validate, { subscriptionCreateRequest } from "./request";

export const main = async(event: APIGatewayProxyEventV2 ) => {
  try {
    const data = JSON.parse(event?.body || "{}");
    const request: subscriptionCreateRequest = validate(data);
    const action = new SubscriptionCreate();
    const result = await action.execute(request);

    return API_SUCCESS({
      message: "successfully saved",
      body: result
    });
  } catch (error) {
    return THROW_API_ERROR(error);
  }
}