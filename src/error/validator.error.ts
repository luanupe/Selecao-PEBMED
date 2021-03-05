import { Result, ValidationError } from "express-validator";

export class ValidationException extends Error {

    errors:ValidationError[];

    constructor(errors:Result<ValidationError>) {

        super('Payload inválido');
        this.errors = errors.array();

    }

}