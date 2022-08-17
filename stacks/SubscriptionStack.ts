import { Api, StackContext, Table, Auth } from "@serverless-stack/resources";

export function SubscriptionStack({ stack, app }: StackContext) {
	// Create a Cognito User Pool and Identity Pool
  // const auth = new Auth(stack, "Auth", {
  //   login: ["email"],
  // });

	// Create the table
	// const table = new Table(stack, "subscriptions", {
	// 	fields: {
	// 		pk: "string",
	// 		sk: "string",
	// 		gsi1pk: "string",
	// 		gsi1sk: "string",
	// 		gsi2pk: "string",
	// 		gsi2sk: "string",
	// 		lsi1pk: "string",
	// 		lsi1sk: "string",
	// 	},
	// 	primaryIndex: { partitionKey: "pk", sortKey: "sk" },
	// 	globalIndexes: {
	// 		GSI1: { partitionKey: "gsi1pk", sortKey: "gsi1sk" },
	// 		// "GSI2": { partitionKey: "gsi2pk", sortKey: "gsi2sk" },
	// 		// "LSI1": { partitionKey: "lsi1pk", sortKey: "lsi1sk" },
	// 	},
	// });

	// Create the HTTP API
	// const api = new Api(stack, "Api", {
	// 	authorizers: {
  //     jwt: {
  //       type: "user_pool",
  //       userPool: {
  //         id: auth.userPoolId,
  //         clientIds: [auth.userPoolClientId],
  //       },
  //     },
  //   },
	// 	defaults: {
	// 		authorizer: "jwt",
	// 		function: {
	// 			// Pass in the table name to our API
	// 			environment: {
	// 				tableName: table.tableName,
	// 				userId: "admin",
	// 			},
	// 			// bundle: {
	// 			// 	esbuildConfig: {
	// 			// 		plugins: "esbuild-decorators-plugin.js",
	// 			// 	},
	// 			// },
	// 		},
	// 	},
	// 	routes: {
	// 		"POST   /subscriptions":
	// 			"functions/apis/subscription_create/handler.main",
	// 		"PUT    /subscriptions":
	// 			"functions/apis/subscription_update/handler.main",
	// 		"GET    /subscriptions": "functions/apis/subscription_list/handler.main",
	// 		"GET    /subscriptions/{id}":
	// 			"functions/apis/subscription_get/handler.main",
	// 		"PUT    /subscriptions/{id}/renew":
	// 			"functions/apis/subscription_reminder_update/handler.main",
	// 		"DELETE /subscriptions/{id}":
	// 			"functions/apis/subscription_delete/handler.main",
	// 	},
	// });

	// Allow the API to access the table
	api.attachPermissions([table]);

	auth.attachPermissionsForAuthUsers([
    api,
		table
  ]);

	// Show the API endpoint in the output
	stack.addOutputs({
		ApiEndpoint: api.url,
		Region: app.region,
    UserPoolId: auth.userPoolId,
    IdentityPoolId: auth.cognitoIdentityPoolId,
    UserPoolClientId: auth.userPoolClientId,
	});

	return { api };
}
