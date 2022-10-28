import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator';

export default class CreateMessageValidator {
    constructor(protected ctx: HttpContextContract) {}

    public schema = schema.create({
        message: schema.string({}, [rules.required()]),
        conversationId: schema.string({}, [rules.required()]),
    });

    public messages: CustomMessages = {};
}
