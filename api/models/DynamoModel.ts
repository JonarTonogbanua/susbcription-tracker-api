import "reflect-metadata";
import {
	hashKey,
	rangeKey,
	table,
} from "@aws/dynamodb-data-mapper-annotations";

const TABLE_NAME = process.env.tableName;

@table(TABLE_NAME)
export class DynamoModel {
	@hashKey({
		type: "String",
		defaultProvider: () => ``,
	})
	pk: string;

	@rangeKey({
		type: "String",
		defaultProvider: () => ``,
	})
	sk: string;

	id: string;
}
