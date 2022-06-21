
import { SubscriptionRepository } from "../../../repositories/SubscriptionRepository";
import { Responses } from "./response";
export class SubscriptionDelete {
  private subscriptionRepository: SubscriptionRepository;

	constructor() {
		this.subscriptionRepository = new SubscriptionRepository();
	}
  async execute(billerId: string): Promise<void> {
    await this.subscriptionRepository.deleteSubscription(billerId);
  }
}