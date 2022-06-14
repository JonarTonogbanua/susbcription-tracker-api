import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { getClient } from "../../../utils/client";

export const main: APIGatewayProxyHandlerV2 = async (event) => {
  const client = getClient()

  const params = {
    // Get the table name from the environment variable
    TableName: process.env.tableName,
    // Get the row where the noteId is the one in the path
    Key: {
      pk: event.pathParameters.id,
      sk: process.env.userId,
    },
  };
  await client.delete(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({ status: true }),
  };
};
