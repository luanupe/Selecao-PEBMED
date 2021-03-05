import { ValidationException } from "../error/validator.error";

export async function getError(e:Error) {
    if ((e instanceof ValidationException)) return e.errors;
    return e.message;
}