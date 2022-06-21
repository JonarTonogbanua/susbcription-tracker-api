import "reflect-metadata";
import { subscriptionCreateRequest } from "./request";
import { SubscriptionRepository } from "../../../repositories/SubscriptionRepository";
// import { Subscription, createSubscription } from "../../../models/subscription";
// import { SubscriptionModel } from "../../../models/entities/SubscriptionModel";
// import { client } from "../../../libs/DynamoDB";
// import { DataMapper } from "@aws/dynamodb-data-mapper";
// import { ulid } from "ulid";

export class SubscriptionCreate {
	private subscriptionRepository: SubscriptionRepository;

	constructor() {
		this.subscriptionRepository = new SubscriptionRepository();
	}
	// async execute(request: subscriptionCreateRequest) {
	// 	const { billerName, billerLink, recurringAmount, recurringEvery, planDescription } = request;
	// 	const subscription = new Subscription(
	// 		undefined,
	// 		undefined,
	// 		billerName,
	// 		undefined,
	// 		recurringAmount,
	// 		recurringEvery,
	// 		billerLink,
	// 		planDescription
	// 	);
	// 	const result = await createSubscription(subscription);

	// 	return result;
	// }

	async execute(request: subscriptionCreateRequest) {
		const subscription = await this.subscriptionRepository.addSubscription(request)

		return subscription
	}
}
