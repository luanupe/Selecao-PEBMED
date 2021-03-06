import { ValidationException } from "../error/validator.error";

export function getError(e:Error) {
    if ((parseInt(process.env.DISPLAY_EXCEPTION) > 0)) console.log(e);
    if ((e instanceof ValidationException)) return e.errors;
    return e.message;
}