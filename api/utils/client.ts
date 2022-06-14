import { DynamoDB } from "aws-sdk";

let client = <any> null

export const getClient = (): DynamoDB.DocumentClient => {
  if(client) return client
  client = new DynamoDB.DocumentClient({
    httpOptions: {
      connectTimeout: 1000,
      timeout: 1000
    }
  })

  return client
}