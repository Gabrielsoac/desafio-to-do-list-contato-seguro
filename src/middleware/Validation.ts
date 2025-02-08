import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { Schema, ValidationError } from "yup";

type TProperty = 'body' | 'header' | 'query' | 'params';

type TAllSchemas = Record<TProperty, Schema>;

type TValidation = (schemas: Partial<TAllSchemas>) => RequestHandler;

export const validation: TValidation = (schemas) => (req, res, next) => {
    
    const errorsResult: Record<string, Record<string, string>> = {};

    Object.entries(schemas).forEach(([key, schema]) => {
        try {
            schema.validateSync(
                req[key as TProperty],
                { abortEarly: false }
            );
        } catch (e) {
            const yupError = e as ValidationError;
            const errors: Record<string, string> = {};
        
            yupError.inner.forEach(error => {
                if (!error.path) return;
                errors[error.path] = error.message;
            });

            errorsResult[key] = errors;
        }
    });

    if (Object.entries(errorsResult).length === 0) {
        next();
    } else {
        res.status(StatusCodes.BAD_REQUEST).json({ errors: errorsResult });
    }
};