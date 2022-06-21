import { HttpResponse } from "../../../libs/Response";

export class Responses {
    static STATUS_200: HttpResponse = {
        code: 200,
        message: 'Subscription successfully deleted',
    };

    static STATUS_404: HttpResponse = {
        code: 404,
        message: 'Subscription not found',
    };
}
