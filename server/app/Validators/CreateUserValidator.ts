import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator';

export default class CreateUserValidator {
    constructor(protected ctx: HttpContextContract) {}

    public schema = schema.create({
        name: schema.string({}, [rules.required(), rules.minLength(3)]),
        email: schema.string({}, [
            rules.email(),
            rules.unique({ table: 'users', column: 'email' }),
        ]),
        password: schema.string({}, [rules.minLength(6), rules.maxLength(50)]),
    });

    public messages: CustomMessages = {
        'name.minLength': 'Name Minimum Three (3) Characters.',
    };
}
