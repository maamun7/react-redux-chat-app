import Route from '@ioc:Adonis/Core/Route';

export default function messageRoute() {
    Route.group(() => {
        Route.get('/:conversationId', 'MessagesController.getMessages');
        Route.post('/add', 'MessagesController.postMessage');
        Route.put('/edit/:id', 'MessagesController.postEditMessage');
        Route.delete('/delete/id', 'MessagesController.deleteMessage');
    })
        .prefix('/messages')
        .namespace('App/Modules/VersionOne/Message');
}
