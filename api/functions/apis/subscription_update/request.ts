import * as joi from "joi";
import { required } from "joi";
import { Validation } from "../../../libs/Validation";

export interface SubscriptionUpdateRequest {
  billerId: string;
  billerName: string;
  remindAt: string;
  billerLink ?: string;
  planDescription ?: string;
  recurringAmount: number;
  recurringEvery: number;
}

export default (request: SubscriptionUpdateRequest): SubscriptionUpdateRequest => {
  const schema = joi.object({
    billerId: joi.string().max(32).allow('', null).required(),
    billerName: joi.string().max(32).allow('', null).required(),
    planDescription: joi.string().max(100).allow('', null).optional(),
    billerLink: joi.string().max(100).allow('', null).optional(),
    recurringAmount: joi.number().required(),
    recurringEvery: joi.number().max(31).required(),
    remindAt: joi.number().required(),
    sk: joi.string().required(),
    pk: joi.string().required(),
  }).required()

  const instance = new Validation<SubscriptionUpdateRequest>(schema);
  return instance.validate(request);
}