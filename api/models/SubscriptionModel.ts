import { attribute, table } from "@aws/dynamodb-data-mapper-annotations";
import { DynamoModel } from "./DynamoModel";
import { validRemindAt } from "../utils/date";

const AUTH_USER_ID = process.env.userId;
export const HASH_PREFIX: string = "USER:<AUTH_USER_ID>";
export const RANGE_PREFIX: string = "BILLER:<BILLER_ID>";

export interface SubscriptionItem {
	billerId ?: string;
	billerName: string;
	billerLink ?: string;
	planDescription?: string;
	recurringAmount: number;
	recurringEvery: number;
	remindAt?: number;

}

export class SubscriptionModel extends DynamoModel {
	private _recurringEvery: number;

	@attribute()
	billerName: string;

	@attribute()
	billerLink: string;

	@attribute()
	planDescription: string;

	@attribute()
	userId: string;

	@attribute()
	recurringAmount: number;

	@attribute()
	remindAt: number;

	set recurringEvery(rec: number) {
		this.remindAt = validRemindAt(rec);
		this._recurringEvery = rec;
	}

	@attribute()
	get recurringEvery(): number {
		return this._recurringEvery;
	}

	set billerId(id: string) {
		this.id = id;
		this.pk = HASH_PREFIX.replace("<AUTH_USER_ID>", AUTH_USER_ID);
		this.sk = RANGE_PREFIX.replace("<BILLER_ID>", id);
	}

	@attribute()
	get billerId() {
		return this.id;
	}

	constructor() {
		super();
	}
}