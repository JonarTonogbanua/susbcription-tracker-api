import { SubscriptionRepository } from "../../../repositories/SubscriptionRepository";
import { Responses } from "./response";

export class SubscriptionReminderUpdate {
  private subscriptionRepository: SubscriptionRepository;

	constructor() {
		this.subscriptionRepository = new SubscriptionRepository();
	}

  async execute(billerId: string) {
    const old_subscription = await this.subscriptionRepository.getSubscription(billerId);
    if (!old_subscription) throw Responses.STATUS_404;
    
    const result = this.subscriptionRepository.updateSubscriptionReminder(old_subscription)
    
    return result
  }
}