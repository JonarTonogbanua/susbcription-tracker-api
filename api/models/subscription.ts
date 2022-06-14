import { DynamoDB } from "aws-sdk"
import { Item } from "./base"
import { getClient } from "../utils/client"

export class Subscription extends Item {

	constructor() {
		super();
	}

	get pk(): string {
		return ``;
	}

	get sk(): string {
		return ``;
	}

	toItem(): Record<string, unknown> {
		return {
			...this.keys(),
		};
	}
}