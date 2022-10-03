import Joi from "joi";

export type CheckRouterQueryResult<T> =
  | { type: "ERROR"; message: string }
  | { type: "OK"; value: T };

export function checkPageNumber(
  page: string | string[] | undefined
): CheckRouterQueryResult<number> {
  if (typeof page !== "string") {
    return {
      type: "ERROR",
      message: "Page number must be a string",
    };
  }
  const pageNum = parseInt(page, 10);

  const schema = Joi.number().integer().min(1).required();
  const result = schema.validate(pageNum);

  if (result.error) {
    return {
      type: "ERROR",
      message: result.error.message,
    };
  }

  return {
    type: "OK",
    value: result.value,
  };
}
