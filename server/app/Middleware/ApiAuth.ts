import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ApiToken from 'App/Models/ApiToken';
import { DateTime } from 'luxon';

export default class ApiAuth {
    public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
        let _token = request.header('Authorization');
        _token = _token === undefined ? '' : _token;
        _token = _token.replace('Bearer ', '');

        const apiToken = await ApiToken.query()
            .where('token', _token)
            .where('is_expired', false)
            .where('expires_at', '>', DateTime.local().toFormat('yyyy-MM-dd HH:mm:ss'))
            .orderBy('id', 'desc')
            .first();

        const userId = apiToken?.userId;

        if (!apiToken) {
            response.unauthorized({
                error: 'You are not authorized, please login before request.',
            });

            return;
        }

        request.all().userId = userId;

        await next();
    }
}
