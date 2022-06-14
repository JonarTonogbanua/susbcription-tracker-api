import { Schema } from 'joi';
import { ParameterError } from './Errors/ParameterError';

export class Validation<R> {
    private schema: Schema;

    constructor(schema: Schema) {
        this.schema = schema;
    }

    validate(request: R): R {
        const { value, error } = this.schema.validate(request, {
            abortEarly: false,
            errors: {
                wrap: {
                    label: '',
                },
            },
        });

        if (error) {
          throw new ParameterError(error.details);
        }

        return value;
    }
}
