import { APIGatewayAuthorizerEvent, Context } from "aws-lambda";
import * as jwt from "jsonwebtoken";

export const main = async (event: APIGatewayAuthorizerEvent, context?: Context) => {
	const request_id =
		context !== undefined && context.awsRequestId ? context.awsRequestId : "";
	const resource = event.methodArn;

	return {
		principalId: request_id,
		policyDocument: {
			Version: "2012-10-17",
			Statement: [
				{
					Action: "execute-api:Invoke",
					Effect: "ALLOW",
					Resource: resource,
				},
			],
		},
	};
};
