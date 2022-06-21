import { ItemList } from "aws-sdk/clients/dynamodb";
import { ulid } from "ulid";
import { Responses } from "../functions/apis/subscription_delete/response";
import {
	SubscriptionModel,
	SubscriptionItem,
	HASH_PREFIX,
	RANGE_PREFIX,
} from "../models/SubscriptionModel";
import { validRemindAt } from "../utils/date";
import { DynamoRepository } from "./DynamoRepository";

export class SubscriptionRepository extends DynamoRepository<SubscriptionModel> {
	async addSubscription(
		subscription: SubscriptionItem
	): Promise<SubscriptionModel | undefined> {
		const item = Object.assign(new SubscriptionModel(), subscription);
		item.billerId = ulid();
		return await this.create(item);
	}

	async updateSubscription(
		subscription: SubscriptionModel,
		data: SubscriptionItem
	): Promise<SubscriptionItem | undefined> {
		subscription.billerName = data.billerName;
		subscription.billerLink = data.billerLink || "";
		subscription.recurringAmount = data.recurringAmount;
		subscription.recurringEvery = data.recurringEvery;
		subscription.planDescription = data.planDescription || "";

		this.update(subscription);
		return data;
	}

	async updateSubscriptionReminder(
		subscription: SubscriptionModel
	): Promise<SubscriptionModel | undefined> {
		subscription.remindAt = validRemindAt(
			Number(subscription?.recurringEvery),
			true
		);
		this.update(subscription);
		return subscription;
	}

	async getSubscriptions(): Promise<ItemList | undefined> {
		const AUTH_USER_ID = process.env.userId || "";

		return this.rawQuery("pk = :pk", "attribute_not_exists (delete_at)", {
			":pk": HASH_PREFIX.replace("<AUTH_USER_ID>", AUTH_USER_ID),
		});
	}

	async getSubscription(
		billerId: string
	): Promise<SubscriptionModel | undefined> {
		const AUTH_USER_ID = process.env.userId || "";

		const result = await this.rawQuery(
			"pk = :pk AND sk = :sk",
			"attribute_not_exists (delete_at)",
			{
				":pk": HASH_PREFIX.replace("<AUTH_USER_ID>", AUTH_USER_ID),
				":sk": RANGE_PREFIX.replace("<BILLER_ID>", billerId),
			}
		);

		return result && result.length > 0
			? Object.assign(new SubscriptionModel(), result?.shift())
			: undefined;
	}

	async deleteSubscription(billerId: string): Promise<void> {
		const AUTH_USER_ID = process.env.userId || "";

		const result = await this.rawQuery(
			"pk = :pk AND sk = :sk",
			"attribute_not_exists (delete_at)",
			{
				":pk": HASH_PREFIX.replace("<AUTH_USER_ID>", AUTH_USER_ID),
				":sk": RANGE_PREFIX.replace("<BILLER_ID>", billerId),
			}
		);

		if (!result) throw Responses.STATUS_404;
		const data = Object.assign(new SubscriptionModel(), result?.shift());
		return this.delete(data);
	}
}
