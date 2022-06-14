import { Api, StackContext, Table } from "@serverless-stack/resources";

export function SubscriptionStack({ stack }: StackContext) {
  // Create the table
  const table = new Table(stack, "Subscriptions", {
    fields: {
      pk: "string",
      sk: "string",
    },
    primaryIndex: { partitionKey: "pk", sortKey: "sk" },
  });

  // Create the HTTP API
  const api = new Api(stack, "Api", {
    defaults: {
      function: {
        // Pass in the table name to our API
        environment: {
          tableName: table.tableName,
          userId: "U$123"
        },
      },
    },
    routes: {
      "POST   /subscriptions": "functions/apis/subscription_create/handler.main",
      // "GET    /subscriptions": "functions/subscriptions/list.main",
      // "GET    /subscriptions/{id}": "functions/subscriptions/get.main",
      // "PUT    /subscriptions/{id}": "functions/subscriptions/update.main",
      // "DELETE /subscriptions/{id}": "functions/subscriptions/delete.main",
    },
  });

  // Allow the API to access the table
  api.attachPermissions([table]);

  // Show the API endpoint in the output
  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
