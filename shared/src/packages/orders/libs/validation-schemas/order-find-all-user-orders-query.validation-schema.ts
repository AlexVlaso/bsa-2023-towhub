import joi from 'joi';

import { CommonValidationMessage } from '~/libs/enums/validation-message.enum.js';

import { CustomerOrderStatus } from '../enums/customer-order-status-value.enum.js';
import { type OrderFindAllUserOrdersQuery } from '../types/types.js';

const orderFindAllUserOrdersQuery = joi.object<
  OrderFindAllUserOrdersQuery,
  true
>({
  size: joi.number().min(0).messages({
    'number.base': CommonValidationMessage.PAGE_SIZE_MUST_BE_NUMBER,
  }),
  page: joi.number().min(0).messages({
    'number.base': CommonValidationMessage.PAGE_INDEX_MUST_BE_NUMBER,
  }),
  status: joi.string().valid(...Object.values(CustomerOrderStatus)),
});

export { orderFindAllUserOrdersQuery };
