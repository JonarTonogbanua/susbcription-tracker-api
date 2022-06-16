import { Api, StackContext, Table } from "@serverless-stack/resources";

export function SubscriptionStack({ stack }: StackContext) {
  // Create the table
  const table = new Table(stack, "subscriptions", {
    fields: {
      pk: "string",
      sk: "string",
      gs1pk: "string",
      gs1sk: "string",
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
          userId: "admin"
        },
      },
    },
    routes: {
      "POST   /subscriptions": "functions/apis/subscription_create/handler.main",
      "GET    /subscriptions": "functions/apis/subscription_list/handler.main",
      "GET    /subscriptions/{id}": "functions/apis/subscription_get/handler.main",
      // "PUT    /subscriptions/{id}": "functions/apis/subscription_reminder/handler.main",
      "PUT    /subscriptions/{id}/renew": "functions/apis/subscription_reminder_update/handler.main",
      "DELETE /subscriptions/{id}": "functions/apis/subscription_delete/handler.main",
    },
  });

  // Allow the API to access the table
  api.attachPermissions([table]);

  // Show the API endpoint in the output
  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
