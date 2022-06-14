import { subscriptionCreateRequest } from "./request";
import { Subscription, createSubscription } from "../../../models/subscription";

export class SubscriptionCreate {
  async execute(request: subscriptionCreateRequest) {
    const { billerName, billerLink, recurringAmount, recurringEvery } = request;
    const remindAt = Date.now()
    const subscription = new Subscription(billerName, remindAt, recurringAmount, recurringEvery, billerLink)
    const result = createSubscription(subscription)
    
    return result
  }
}