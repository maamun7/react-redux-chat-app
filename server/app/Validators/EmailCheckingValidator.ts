import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator';

export default class EmailCheckingValidator {
    constructor(protected ctx: HttpContextContract) {}

    public schema = schema.create({
        email: schema.string({}, [rules.required(), rules.email()]),
    });

    public messages: CustomMessages = {};
}
