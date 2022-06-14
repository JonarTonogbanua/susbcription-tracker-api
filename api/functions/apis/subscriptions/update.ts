import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { getClient } from "../../../utils/client";

export const main: APIGatewayProxyHandlerV2 = async (event) => {
  const client = getClient();
  const data = JSON.parse(event.body);

  const params = {
    // Get the table name from the environment variable
    TableName: process.env.tableName,
    // Get the row where the noteId is the one in the path
    Key: {
      pk: event.pathParameters.id,
      sk: process.env.userId,
    },
    // Update the "content" column with the one passed in
    UpdateExpression: "SET remindAt = :remindAt",
    ExpressionAttributeValues: {
      ":content": data.content || null,
    },
    ReturnValues: "ALL_NEW",
  };

  const results = await client.update(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(results.Attributes),
  };
};
