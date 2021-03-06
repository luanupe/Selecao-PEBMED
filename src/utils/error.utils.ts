import { ValidationException } from "../error/validator.error";

export async function getError(e:Error) {
    console.log(e);
    if ((e instanceof ValidationException)) return e.errors;
    return e.message;
}