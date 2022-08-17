import { StackContext, Table } from "@serverless-stack/resources";

export function DynamoStack({ stack, app }: StackContext) {

  // Create the table
	const table = new Table(stack, "subscriptions", {
		fields: {
			pk: "string",
			sk: "string",
			gsi1pk: "string",
			gsi1sk: "string",
			gsi2pk: "string",
			gsi2sk: "string",
			lsi1pk: "string",
			lsi1sk: "string",
		},
		primaryIndex: { partitionKey: "pk", sortKey: "sk" },
		globalIndexes: {
			GSI1: { partitionKey: "gsi1pk", sortKey: "gsi1sk" },
			// "GSI2": { partitionKey: "gsi2pk", sortKey: "gsi2sk" },
			// "LSI1": { partitionKey: "lsi1pk", sortKey: "lsi1sk" },
		},
	});

  return { table }
}