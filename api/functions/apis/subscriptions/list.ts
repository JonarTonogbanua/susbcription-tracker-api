import { getClient } from "../../../utils/client";

export async function main() {
  const client = getClient()

  const params = {
    // Get the table name from the environment variable
    TableName: process.env.tableName,
    // Get all the rows where the userId is our hardcoded user id
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: {
      ":pk": process.env.userId,
    },
  };
  const results = await client.query(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(results.Items),
  };
}
