import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';

export default class UsersController {
    public async getUsers({ response }: HttpContextContract) {
        const user = await User.all();

        response.send(user);
    }
}
