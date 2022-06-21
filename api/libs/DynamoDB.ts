import { DynamoDB } from "aws-sdk";
import { DataMapper } from '@aws/dynamodb-data-mapper';


let client = new DynamoDB({
    httpOptions: {
      connectTimeout: 1000,
      timeout: 1000
    }
  })

const mapper = new DataMapper({
  client,
});

const docClient = new DynamoDB.DocumentClient({
  service: client,
});

export { mapper, client, docClient }