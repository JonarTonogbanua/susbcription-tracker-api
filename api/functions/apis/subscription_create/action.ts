import { subscriptionCreateRequest } from "./request";
import { Subscription, createSubscription } from "../../../models/subscription";

export class SubscriptionCreate {
	async execute(request: subscriptionCreateRequest) {
		const { billerName, billerLink, recurringAmount, recurringEvery, planDescription } = request;
		const subscription = new Subscription(
			undefined,
			undefined,
			billerName,
			undefined,
			recurringAmount,
			recurringEvery,
			billerLink,
			planDescription
		);
		const result = await createSubscription(subscription);

		return result;
	}
}
