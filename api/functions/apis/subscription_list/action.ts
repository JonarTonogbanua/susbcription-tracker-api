import { SubscriptionRepository } from "../../../repositories/SubscriptionRepository";

export class SubscriptionList {
	private subscriptionRepository: SubscriptionRepository;

	constructor() {
		this.subscriptionRepository = new SubscriptionRepository();
	}

	async execute() {
		const result = await this.subscriptionRepository.getSubscriptions();
		return result;
	}
}
