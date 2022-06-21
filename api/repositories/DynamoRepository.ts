import { DynamoModel } from "../models/DynamoModel";
import { mapper, docClient } from "../libs/DynamoDB";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

const TABLE_NAME = process.env.tableName;

export enum SelectAttribute {
	ALL_ATTRIBUTES = "ALL_ATTRIBUTES",
	SPECIFIC_ATTRIBUTES = "SPECIFIC_ATTRIBUTES",
	COUNT = "COUNT",
}

export class DynamoRepository<T extends DynamoModel> {
	public async create(item: T): Promise<T> {
		return await mapper.put(item);
	}

  public async update(item: T): Promise<T> {
    return mapper.put(item);
}

public async delete(item: T): Promise<void> {
  await mapper.delete(item);
}

	public async query(params: T): Promise<T> {
		return await mapper.get(params);
	}

	public async rawQuery(
		KeyConditionExpression: string,
		FilterExpression: string | undefined,
		ExpressionAttributeValues: DocumentClient.ExpressionAttributeValueMap,
		IndexName: string | undefined = undefined,
		Select: SelectAttribute = SelectAttribute.ALL_ATTRIBUTES,
		ProjectionExpression: string | undefined = undefined,
		ExpressionAttributeNames:
			| undefined
			| DocumentClient.ExpressionAttributeNameMap = undefined
	): Promise<DocumentClient.ItemList | undefined> {
		const params: DocumentClient.QueryInput = {
			TableName: TABLE_NAME,
			KeyConditionExpression,
			FilterExpression,
			ExpressionAttributeValues,
			IndexName,
			Select,
			ProjectionExpression,
			ExpressionAttributeNames,
		};

		let items: DocumentClient.ItemList = [];
		let result: DocumentClient.QueryOutput;

		do {
			result = await docClient.query(params).promise();
			if (!result.Items) return undefined;
			items = [...items, ...result.Items];

			if (result.LastEvaluatedKey) {
				params.ExclusiveStartKey = result.LastEvaluatedKey;
			}
		} while (result.LastEvaluatedKey);

    return items;
	}
}
