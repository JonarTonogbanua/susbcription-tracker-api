import { APIGatewayProxyEventV2 } from "aws-lambda";
import { API_SUCCESS, THROW_API_ERROR } from "../../../libs/Response";
import { Responses } from "../subscription_reminder_update/response";
import { SubscriptionUpdate } from "./action";
import validate, { SubscriptionUpdateRequest } from "./request";

export const main = async (event: APIGatewayProxyEventV2) => {
	try {
		const data = JSON.parse(event?.body || "{}");
		const action = new SubscriptionUpdate();
		const request: SubscriptionUpdateRequest = validate(data);
		const result = await action.execute(request?.billerId, request);

		return API_SUCCESS({
			...Responses.STATUS_200,
			body: result,
		});
	} catch (error) {
		return THROW_API_ERROR(error);
	}
};
