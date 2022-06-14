import { DynamoDB } from "aws-sdk";

export abstract class Item {
	abstract get pk(): string;
	abstract get sk(): string;

	public keys() {
		return {
			pk: this.pk,
			sk: this.sk,
		};
	}

	abstract toItem(): Record<string, unknown>;
}
