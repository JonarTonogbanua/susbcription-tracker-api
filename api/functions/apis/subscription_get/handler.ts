import { APIGatewayProxyEventV2 } from "aws-lambda";
import { API_SUCCESS, THROW_API_ERROR } from "../../../libs/Response";
import { SubscriptionGet } from "./action";

export const main = async (event: APIGatewayProxyEventV2) => {
	try {
		const action = new SubscriptionGet();
		const result = await action.execute(event.pathParameters?.id || "");

		return API_SUCCESS({
			message: "successfully retrieved",
			body: result,
		});
	} catch (error) {
		return THROW_API_ERROR(error);
	}
};
