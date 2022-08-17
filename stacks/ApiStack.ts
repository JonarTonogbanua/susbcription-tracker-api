import { StackContext, Api, use, Auth, Function } from "@serverless-stack/resources";
import { DynamoStack } from "./DynamoStack";

export function ApiStack({ stack, app }: StackContext) {
  const { table } = use(DynamoStack);

	const auth = new Auth(stack, "Auth", {
    login: ["email"],
  });
  
	// Create the HTTP API
	const api = new Api(stack, "Api", {
		authorizers: {
			jwt: {
				type: "user_pool",
				userPool: {
					id: auth.userPoolId,
					clientIds: [auth.userPoolClientId],
				},
			},
			isAdmin : {
				type: "lambda",
				function: new Function(this, "isAdmin", {
					handler: "functions/middleware/is_admin/handler.main"
				})
			}
		},
		defaults: {
			authorizer: "jwt",
			function: {
				// Pass in the table name to our API
				environment: {
					tableName: table.tableName,
					userId: "admin",
				},
			},
		},
		routes: {
			"GET    /subscriptions": {
				authorizer: "isAdmin",
				function: "functions/apis/subscription_list/handler.main",
			},
			"POST   /subscriptions":
				"functions/apis/subscription_create/handler.main",
			"PUT    /subscriptions":
				"functions/apis/subscription_update/handler.main",
			"GET    /subscriptions/{id}":
				"functions/apis/subscription_get/handler.main",
			"PUT    /subscriptions/{id}/renew":
				"functions/apis/subscription_reminder_update/handler.main",
			"DELETE /subscriptions/{id}":
				"functions/apis/subscription_delete/handler.main",
		},
	});

	return { api, auth };
}
