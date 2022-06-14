import { DynamoDB } from "aws-sdk"
import { ulid } from "ulid";
import { Item } from "./base"
import { getClient } from "../utils/client"

export class Subscription extends Item {
	billerName: string
	billerLink : string
	billerId: string
	userId: string
  recurringAmount: number
	recurringEvery: number
	remindAt: number

	constructor(billerName: string, remindAt: number, recurringAmount : number, recurringEvery : number, billerLink?: string, billerId: string = ulid()) {
		super()
		this.billerName = billerName
		this.recurringAmount = recurringAmount
		this.recurringEvery = recurringEvery
		this.remindAt = remindAt
		this.billerId = billerId
		this.billerLink = billerLink || ""
		this.userId = process.env.userId
}

	get pk(): string {
		return `SBS#${this.billerId}`;
	}

	get sk(): string {
		return `U#${this.userId}`;
	}

	static fromItem(item ?: DynamoDB.AttributeMap): Subscription {
			if (!item) throw new Error("No item!")
			return new Subscription(
					item.billerName,
					item.billerId,
					item.billerLink,
					Number(item.recurringAmount),
					Number(item.recurringEvery),
					Number(item.remindAt),
			)
	}

	toItem(): Record<string, unknown> {
		return {
			...this.keys(),
			billerName: this.billerName,
			recurringAmount: this.recurringAmount,
			recurringEvery: this.recurringEvery,
			remindAt: this.remindAt,
			billerId: this.billerId,
			billerLink: this.billerLink,
		};
	}
}

export const createSubscription = async (subscription: Subscription): Promise<Subscription> => {
	const client = getClient()
	try {
			await client
					.put({
							TableName: process.env.tableName,
							Item: subscription.toItem(),
							ConditionExpression: "attribute_not_exists(PK)"
					})
					.promise()
			return subscription
	} catch (error) {
			console.log(error)
			throw error
	}
}