
import { DynamoDB } from "aws-sdk";
import { Subscription, deleteSubscription } from "../../../models/subscription";

export class SubscriptionDelete {
  async execute(billerId: string) {
    const result = deleteSubscription(billerId)
    
    return result
  }
}