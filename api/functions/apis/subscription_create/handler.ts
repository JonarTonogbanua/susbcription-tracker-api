import { APIGatewayProxyEventV2 } from "aws-lambda";
import { ulid } from "ulid";
import { SubscriptionCreate } from "./action"
import validate, { subscriptionCreateRequest } from "./request";

export const main = async(event: APIGatewayProxyEventV2) => {
  try {
    const data = JSON.parse(event?.body || "{}");
    const request: subscriptionCreateRequest = validate(data);
    
    const action = new SubscriptionCreate();

    const result = await action.execute(request);
    // const data = await action.execute(request)
  
    // const params = {
    //   // Get the table name from the environment variable
    //   TableName: process.env.tableName,
    //   Item: {
    //     pk: `SBS$${ulid()}`, // A unique uuid
    //     sk: process.env.userId,
    //     billerName: data.billerName,
    //     billerLink: data.billerLink,
    //     recurringAmount: data.recurringAmount,
    //     recurringEvery: data.recurringEvery,
    //     remindAt: Date.now(),
    //   },
    // };
    return result
  } catch (error) {
    return error
  }
}