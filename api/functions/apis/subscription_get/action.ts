
import { DynamoDB } from "aws-sdk";
import { Subscription, getSubscription } from "../../../models/subscription";


export class SubscriptionGet {
  async execute(billerId: string) {
    const result: Promise<Subscription> = getSubscription(billerId)
    
    return result
  }
}