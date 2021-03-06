import { Result, ValidationError } from "express-validator";

export class ValidationException extends Error {

    public errors:ValidationError[];

    constructor(errors:Result<ValidationError>) {

        super('Payload inválido');
        this.errors = errors.array();

    }

}