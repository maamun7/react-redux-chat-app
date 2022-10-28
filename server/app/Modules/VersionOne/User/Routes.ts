import Route from '@ioc:Adonis/Core/Route';

export default function userRoute() {
    Route.group(() => {
        Route.get('/', 'UsersController.getUsers');
        Route.put('/profile-image', 'ProfilesController.putProfileImage');
    })
        .prefix('users')
        .namespace('App/Modules/VersionOne/User');
}
