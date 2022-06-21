import { SubscriptionUpdateRequest } from "./request";
import { SubscriptionItem } from "../../../models/SubscriptionModel";
import { SubscriptionRepository } from "../../../repositories/SubscriptionRepository";
import { Responses } from "./response";

export class SubscriptionUpdate {
	private subscriptionRepository: SubscriptionRepository;

	constructor() {
		this.subscriptionRepository = new SubscriptionRepository();
	}
	async execute(
		billerId: string,
		request: SubscriptionUpdateRequest
	): Promise<SubscriptionItem | undefined> {
		const {
			billerName,
			billerLink,
			recurringAmount,
			recurringEvery,
			planDescription,
		} = request;
		const old_subscription = await this.subscriptionRepository.getSubscription(
			billerId
		);

		if (!old_subscription) throw Responses.STATUS_404;

		const data: SubscriptionItem = {
			billerId,
			billerName,
			billerLink,
			recurringAmount,
			recurringEvery,
			planDescription,
		};

		const updated_subscription =
			await this.subscriptionRepository.updateSubscription(
				old_subscription,
				data
			);

		return updated_subscription;
	}
}
