import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import DB from '@ioc:Adonis/Lucid/Database';
import ChatItem from 'App/Models/ChatItem';
import Message from 'App/Models/Message';
import Ws from 'App/Services/Ws';
import CreateMessageValidator from 'App/Validators/CreateMessageValidator';

export default class MessagesController {
    public async getMessages({ request, response, params }: HttpContextContract) {
        const conversationId = params.conversationId;
        const userId = request.input('userId');
        let conversation: object | null = {};

        try {
            conversation = await ChatItem.query()
                .preload('contact', (cQuery) => {
                    cQuery.select('users.id', 'users.name', 'users.email', 'users.avatar');
                })
                .preload('messages', (mQuery) => {
                    mQuery
                        .select(
                            'messages.id',
                            'messages.message',
                            'messages.created_by',
                            'messages.created_at'
                        )
                        .preload('recipients', (rQuery) => {
                            rQuery
                                .select('message_recipients.recipient_id')
                                .preload('user', (uQuery) => {
                                    uQuery.select('users.name', 'users.email as userEmail');
                                });
                        });
                })
                .select('chat_items.contact_id', 'chat_items.id', 'chat_items.conversation_id')
                .where('chat_items.conversation_id', conversationId)
                .where('chat_items.contact_id', '<>', userId)
                .first();
        } catch (error) {
            console.log('Something went wrong');
        }

        response.json(conversation);
    }

    public async postMessage({ request, response }: HttpContextContract) {
        const userId = request.input('userId');
        const payload = await request.validate(CreateMessageValidator);

        let res = {};
        const trx = await DB.transaction();

        try {
            const message = await Message.create({
                conversationId: payload.conversationId,
                message: payload.message,
                createdBy: userId,
            });

            if (message) {
                const contact = await ChatItem.query()
                    .select('*')
                    .where('conversation_id', payload.conversationId)
                    .where('contact_id', '<>', userId)
                    .first();

                message.related('recipients').create({
                    messageId: message?.id,
                    recipientId: contact?.contactId,
                });

                res = {
                    ...res,
                    isSuccess: true,
                    messageId: message?.id,
                    message: message?.message,
                    conversationId: payload?.conversationId,
                    recipientId: contact?.contactId,
                    createdBy: message?.createdBy,
                    createdAt: message?.createdAt,
                };
            }

            await trx.commit();
            Ws.io.emit('new:messages', res);
        } catch (error) {
            await trx.rollback();

            res = {
                ...res,
                isSuccess: false,
                messageId: null,
                message: null,
                conversationId: null,
                recipientId: null,
                createdBy: null,
            };
        }

        response.json(res);
    }
}
