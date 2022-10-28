import Route from '@ioc:Adonis/Core/Route';
import authRoute from './Auth/Routes';
import conversationRoute from './Conversation/Routes';
import messageRoute from './Message/Routes';
import userRoute from './User/Routes';

export default function versionOneRoutes() {
    Route.group(() => {
        authRoute();
    }).prefix('/v1');

    Route.group(() => {
        conversationRoute();
        messageRoute();
        userRoute();
    })
        .prefix('/v1')
        .middleware('apiAuth');
}
