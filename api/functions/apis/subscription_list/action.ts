
import { DynamoDB } from "aws-sdk";
import { Subscription, getSubscriptions } from "../../../models/subscription";

export class SubscriptionList {
  async execute() {
    const result: Promise<Subscription[]> = getSubscriptions()
    
    return result
  }
}