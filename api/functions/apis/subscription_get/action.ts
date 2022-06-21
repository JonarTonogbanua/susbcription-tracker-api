import { SubscriptionRepository } from "../../../repositories/SubscriptionRepository";

export class SubscriptionGet {
	private subscriptionRepository: SubscriptionRepository;

	constructor() {
		this.subscriptionRepository = new SubscriptionRepository();
	}

	async execute(billerId: string) {
		const AUTH_USER_ID = process.env.userId;

		const result = this.subscriptionRepository.getSubscription(billerId);

		return result;
	}
}
