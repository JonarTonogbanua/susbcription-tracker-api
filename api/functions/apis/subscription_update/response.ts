import { HttpResponse } from "../../../libs/Response";

export class Responses {
    static STATUS_200: HttpResponse = {
        code: 200,
        message: 'Subscription successfully update',
    };

    static STATUS_404: HttpResponse = {
        code: 404,
        message: 'Subscription not found',
    };

    static STATUS_409: HttpResponse = {
        code: 409,
        message: 'Bad request',
    };
}
