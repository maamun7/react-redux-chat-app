import Route from '@ioc:Adonis/Core/Route';

export default function authRoute() {
    Route.group(() => {
        Route.post('/register', 'RegistrationController.postRegistration');
        Route.post('/login', 'AuthController.postLogin');
    })
        .prefix('auth')
        .namespace('App/Modules/VersionOne/Auth');
}
