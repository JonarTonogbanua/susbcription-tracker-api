import { Item } from "./base";

export class User extends Item {
	username: string;
	email: string;

	constructor(username: string, email: string) {
		super();
		this.username = username;
		this.email = email;
	}

	get pk(): string {
		return `U#${this.username}`;
	}

	get sk(): string {
		return `U#${this.username}`;
	}

	toItem(): Record<string, unknown> {
		return {
			...this.keys(),
			username: { S: this.username },
			email: { S: this.email },
		};
	}
}
