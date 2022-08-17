import { StackContext, use } from "@serverless-stack/resources";
import { ApiStack } from "./ApiStack";
import { DynamoStack } from "./DynamoStack";

export function CoreStack({ stack, app }: StackContext) {
  const { api, auth } = use(ApiStack);
  const { table } = use(DynamoStack);

  api.attachPermissions([table]);

	auth.attachPermissionsForAuthUsers([
    api,
		table
  ]);

  stack.addOutputs({
		ApiEndpoint: api.url,
		Region: app.region,
    UserPoolId: auth.userPoolId,
    IdentityPoolId: auth.cognitoIdentityPoolId as string,
    UserPoolClientId: auth.userPoolClientId,
	});
}