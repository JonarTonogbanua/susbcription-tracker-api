import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { ulid } from "ulid";
import { getClient } from "../../../utils/client";

export const main: APIGatewayProxyHandlerV2 = async (event) => {
  const data = JSON.parse(event.body);
  const client = getClient();

  const params = {
    // Get the table name from the environment variable
    TableName: process.env.tableName,
    Item: {
      pk: `SBS$${ulid()}`, // A unique uuid
      sk: process.env.userId,
      billerName: data.billerName,
      billerLink: data.billerLink,
      recurringAmount: data.recurringAmount,
      recurringEvery: data.recurringEvery,
      remindAt: Date.now(),
    },
  };

  await client.put(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(params.Item),
  };
};
