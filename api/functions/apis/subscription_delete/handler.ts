import { APIGatewayProxyEventV2 } from "aws-lambda";
import { API_SUCCESS, THROW_API_ERROR } from "../../../libs/Response";
import { SubscriptionDelete } from "./action";
import { Responses } from "./response";

export const main = async (event: APIGatewayProxyEventV2) => {
	try {
		const action = new SubscriptionDelete();
		await action.execute(event.pathParameters?.id || "");

		return API_SUCCESS({
			...Responses.STATUS_200
		});
	} catch (error) {
		return THROW_API_ERROR(error);
	}
};
