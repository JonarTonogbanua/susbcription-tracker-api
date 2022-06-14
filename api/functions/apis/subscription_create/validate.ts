import * as joi from "joi";
import { Validation } from "../../../libs/Validation";

export interface subscriptionCreateRequest {
  billerName: string;
  billerLink ?: string;
  recurringAmount: number;
  recurringEvery: string;
}

export default (request: subscriptionCreateRequest): subscriptionCreateRequest  {
  const schema = joi.object({
    billerName: joi.string().max(32).allow('', null).required(),
    billerLink: joi.string().max(32).allow('', null).optional(),
    recurringAmount: joi.number().required(),
    recurringEvery: joi.string().max(32).required(),
  }).required()

  const instance = new Validation<subscriptionCreateRequest>(schema);
  return instance.validate(request);
}