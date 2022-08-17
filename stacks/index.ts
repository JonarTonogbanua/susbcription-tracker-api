import "reflect-metadata";
import { ApiStack } from "./ApiStack";
import { DynamoStack } from "./DynamoStack";
import { CoreStack } from "./CoreStack";
import { App } from "@serverless-stack/resources";

export default function (app: App) {
	app.setDefaultFunctionProps({
		runtime: "nodejs16.x",
		srcPath: "api",
		bundle: {
			format: "esm",
		},
	});

	app.stack(DynamoStack).stack(ApiStack).stack(CoreStack);
}
