import Route from '@ioc:Adonis/Core/Route';

export default function conversationRoute() {
    Route.group(() => {
        Route.get('/', 'ConversationsController.getConversations');
        Route.get('/:conversationId', 'ConversationsController.getConversation');
        Route.post('/add', 'ConversationsController.postConversation');
        // Route.put('/response', 'ConversationsController.postFriend');
        // Route.delete('/id?', 'ConversationsController.deleteFriend');
        Route.get('/raw-query', 'ConversationsController.testRawQuery');
        Route.get('/email-status/:email', 'ConversationsController.getEmailCheck');
    })
        .prefix('/conversations')
        .namespace('App/Modules/VersionOne/Conversation');
}
