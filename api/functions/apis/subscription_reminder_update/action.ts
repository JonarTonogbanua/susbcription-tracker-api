
import { DynamoDB } from "aws-sdk";
import { Subscription, updateSubscriptionReminder } from "../../../models/subscription";

export class SubscriptionReminderUpdate {
  async execute(billerId: string) {
    const result = updateSubscriptionReminder(billerId)
    
    return result
  }
}