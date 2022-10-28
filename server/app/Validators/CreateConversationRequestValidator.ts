import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { CustomMessages, schema } from '@ioc:Adonis/Core/Validator';

export default class CreateConversationRequestValidator {
    constructor(protected ctx: HttpContextContract) {}

    public schema = schema.create({
        contactId: schema.number(),
    });

    public messages: CustomMessages = {};
}
