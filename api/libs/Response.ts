export interface HttpResponse {
	statusCode?: number;
	code ?: number;
	message: string;
	[key: string]: unknown;
}
export interface APIHttpResponse {
	headers: unknown;
	statusCode: number;
	body: string;
}

const BASE_RESPONSE = {
	headers: {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Credentials": true,
		"Access-Control-Allow-Headers": "Access-Token",
	},
	body: null,
};

export const API_SUCCESS = (data: HttpResponse): APIHttpResponse => {
	return {
		...BASE_RESPONSE,
		statusCode: 200,
    body: JSON.stringify(data)
	};
};

export const THROW_API_ERROR = (error: HttpResponse): APIHttpResponse => {
	const code = error.code ? error.code : 500;
	const statusCode = error.statusCode ?? code;
	const { message } = error;
	const errors = error?.errors;

	return {
		...BASE_RESPONSE,
		statusCode,
		body: JSON.stringify({
			code,
			message,
			errors,
		}),
	};
};
