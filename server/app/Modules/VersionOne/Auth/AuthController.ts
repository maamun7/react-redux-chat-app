import Hash from '@ioc:Adonis/Core/Hash';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ApiToken from 'App/Models/ApiToken';
import User from 'App/Models/User';
import { DateTime } from 'luxon';

export default class AuthController {
    public async postLogin({ auth, request, response }: HttpContextContract) {
        const email = request.input('email');
        const password = request.input('password');

        // Lookup user manually
        const user = await User.query()
            .select('id', 'name', 'email', 'password', 'avatar')
            .where('email', email)
            .where('isActive', true)
            .firstOrFail();

        // Verify password
        if (!(await Hash.verify(user?.password, password))) {
            return response.unauthorized('Invalid credentials');
        }

        // Expire previous tokens
        await ApiToken.query()
            .where('user_id', user?.id)
            .update({
                is_expired: true,
                expires_at: DateTime.local().toFormat('yyyy-MM-dd hh:mm:ss'),
            });

        // Generate token
        const token = await auth.use('api').generate(user, {
            name: 'API access token.',
            expires_at: DateTime.local().plus({ days: 7 }).toFormat('yyyy-MM-dd hh:mm:ss'),
        });

        return response.created({
            ...token,
            isSuccess: true,
        });
    }
}
