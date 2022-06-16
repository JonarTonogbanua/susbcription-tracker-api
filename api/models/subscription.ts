import { DynamoDB } from "aws-sdk";
import { ulid } from "ulid";
import {
	format,
	setDate,
	getDaysInMonth,
	getTime,
	isBefore,
	addMonths,
} from "date-fns";
import { Item } from "./base";
import { getClient } from "../libs/Dynamo";
import { executeTransactWrite } from "../utils/transaction";

export class Subscription extends Item {
	billerName: string;
	billerLink: string;
	planDescription: string;
	billerId: string;
	userId: string;
	recurringAmount: number;
	recurringEvery: number;
	remindAt: number;

	constructor(
		billerId: string = ulid(),
		userId: string = process.env.userId || "",
		billerName?: string,
		remindAt?: number,
		recurringAmount?: number,
		recurringEvery?: number,
		billerLink?: string,
		planDescription?: string
	) {
		super();
		this.userId = userId;
		this.billerId = billerId;
		this.billerName = billerName || "";
		this.recurringAmount = recurringAmount || 0;
		this.recurringEvery = recurringEvery || 0;
		this.remindAt = remindAt || Subscription.validRemindAt(this.recurringEvery);
		this.billerLink = billerLink || "";
		this.planDescription = planDescription || "";
	}

	get pk(): string {
		// User Subscription
		return `US#${this.userId}`;
	}

	get sk(): string {
		// Biller
		return `B#${this.billerId}`;
	}

	static fromItem(subscription?: DynamoDB.DocumentClient.AttributeMap) {
		if (!subscription) throw new Error("No item!")
		const item = subscription;

		return new Subscription(
			item.billerId.S,
			undefined,
			item.billerName.S,
			Number(item.remindAt.N),
			Number(item.recurringAmount.N),
			Number(item.recurringEvery.N),
			item.billerLink.S,
			item.planDescription.S,
		);
	}

	static validRemindAt(recurringEvery: number, force = false) {
		const cutoff = setDate(new Date(), recurringEvery);
		const today = new Date();
		let currentMonthLastDay: number;
		let currentMonth: Date;

		if (isBefore(cutoff, today) || force) {
			const temp = addMonths(setDate(today, 1), 1);
			currentMonthLastDay = getDaysInMonth(temp);
			currentMonth = temp;
		} else {
			currentMonthLastDay = getDaysInMonth(today);
			currentMonth = today;
		}

		recurringEvery =
			recurringEvery > currentMonthLastDay
				? currentMonthLastDay
				: recurringEvery;
		const newCutoff = getTime(currentMonth.setDate(recurringEvery));

		return newCutoff;
	}

	toItem(): Record<string, unknown> {
		return {
			...this.keys(),
			billerName: { S: this.billerName },
			recurringAmount: { N: this.recurringAmount.toString() },
			recurringEvery: { N: this.recurringEvery.toString() },
			remindAt: { N: this.remindAt.toString() },
			billerId: { S: this.billerId },
			billerLink: { S: this.billerLink },
			planDescription: { S: this.planDescription }
		};
	}
}

export const createSubscription = async (
	subscription: Subscription
): Promise<Subscription> => {
	const client = getClient();
	const params = {
		TableName: process.env.tableName,
		Item: subscription.toItem(),
	} as DynamoDB.PutItemInput;

	try {
		await client.putItem(params).promise();
		return subscription;
	} catch (error) {
		throw error;
	}
};

export const getSubscriptions = async (): Promise<Subscription[]> => {
	const client = getClient();

	const instance = new Subscription();

	try {
		const subscriptions = await client
			.query({
				TableName: process.env.tableName,
				KeyConditionExpression: "pk = :pk",
				ExpressionAttributeValues: {
					":pk": { S: instance.pk },
				},
			})
			.promise();
		return (
			subscriptions.Items?.map((subscription) =>
				Subscription.fromItem(subscription)
			) || []
		);
	} catch (error) {
		throw error;
	}
};

export const getSubscription = async (
	billerId?: string
): Promise<Subscription> => {
	const client = getClient();
	const instance = new Subscription(billerId);
	const params = {
		TableName: process.env.tableName,
		Key: instance.keys(),
	} as DynamoDB.GetItemInput;

	try {
		const subscription = await client.getItem(params).promise();
		return Subscription.fromItem(subscription.Item);
	} catch (error) {
		throw error;
	}
};

export const updateSubscriptionReminder = async (billerId: string) => {
	const client = getClient();
	const instance = new Subscription(billerId);
	const { recurringAmount, recurringEvery, billerLink, billerName, planDescription } =
		await getSubscription(billerId);


	const remindAt = Subscription.validRemindAt(recurringEvery, true);

	const resubscribe = new Subscription(
		undefined,
		undefined,
		billerName,
		remindAt,
		recurringAmount,
		recurringEvery,
		billerLink,
		planDescription
	);

	try {
	await executeTransactWrite({
		client,
		params: {
			TransactItems: [
				{
					Put: {
						TableName: process.env.tableName,
						Item: resubscribe.toItem(),
					},
				},
				{
					Delete: {
						TableName: process.env.tableName,
						Key: instance.keys(),
					},
				},
			],
		},
	});
	} catch (error) {}
};

export const deleteSubscription = async (billerId: string) => {
	const client = getClient();
	const instance = new Subscription(billerId);
	const params = {
		TableName: process.env.tableName,
		Key: instance.keys(),
	} as DynamoDB.DeleteItemInput;
	try {
		await client.deleteItem(params).promise();

		return billerId;
	} catch (error) {
		throw error;
	}
};
