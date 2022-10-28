import { string } from '@ioc:Adonis/Core/Helpers';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import DB from '@ioc:Adonis/Lucid/Database';
import ChatItem from 'App/Models/ChatItem';
import Conversation from 'App/Models/Conversation';
import User from 'App/Models/User';
import CreateConversationRequestValidator from 'App/Validators/CreateConversationRequestValidator';

export default class ConversationsController {
    public async getConversations({ request, response }: HttpContextContract) {
        const userId = request.input('userId');
        let chatItems: [] = [];

        const sql = `SELECT 
		u.name,
		u.email,
		u.avatar,
		c.title,
		c.conversation_id AS conversationId,
		c.type,
		COALESCE((SELECT 
						message
					FROM
						messages
					WHERE
						conversation_id = conversationId
					ORDER BY id DESC
					LIMIT 1),
				'No message found') AS lastText,
		COALESCE(DATE_FORMAT((SELECT 
								created_at
							FROM
								messages
							WHERE
								conversation_id = conversationId
							ORDER BY id DESC
							LIMIT 1),
						'%h:%i %p'),
				'00:00 00') AS timestamp
	FROM
		chat_items AS ci
			JOIN
		users AS u ON u.id = ci.contact_id
			JOIN
		conversations AS c ON c.conversation_id = ci.conversation_id
	WHERE
		ci.user_id = :userId
	LIMIT 20`;

        const bindings = { userId: userId };

        try {
            [chatItems] = await DB.rawQuery(sql, bindings);
        } catch (error) {
            console.log('Something went wrong');
        }

        response.send(chatItems);
    }

    public async getConversation({ response, params }: HttpContextContract) {
        //  const conversationId = params.conversationId;
        //  const userId = request.input('userId');
        let conversation: object | null = {};

        response.json(conversation);
    }

    public async postConversation({ request, response }: HttpContextContract) {
        const payload = await request.validate(CreateConversationRequestValidator);
        const userId = request.input('userId');

        let res = {};
        const trx = await DB.transaction();

        try {
            const conversation = await Conversation.create({
                conversationId: string.generateRandom(32),
                createdBy: userId,
            });

            if (conversation) {
                const chatItem = new ChatItem();
                chatItem.userId = userId;
                chatItem.contactId = payload.contactId;
                chatItem.isRequestor = true;

                const chatItem1 = new ChatItem();
                chatItem1.userId = payload.contactId;
                chatItem1.contactId = userId;

                conversation.related('chatItem').saveMany([chatItem, chatItem1]);
            }

            res = {
                ...res,
                isSuccess: true,
                conversationId: conversation.conversationId,
                userId: conversation.createdBy,
            };

            await trx.commit();
        } catch (error) {
            await trx.rollback();

            res = {
                ...res,
                isSuccess: false,
                conversationId: null,
                userId: null,
            };
        }

        response.send(res);
    }

    public async putFriend({ response }: HttpContextContract) {
        const user = await User.all();

        response.send(user);
    }

    public async deleteFriend({ response }: HttpContextContract) {
        const user = await User.all();

        response.send(user);
    }

    public async testRawQuery({ response }: HttpContextContract) {
        const [results] = await DB.rawQuery('SELECT * FROM users WHERE id = 5');

        response.send(results);
    }

    public async getEmailCheck({ request, response, params }: HttpContextContract) {
        const userId = request.input('userId');
        const email = params.email;
        let res: { hasUser: boolean; userId: any; conversationId: string } = {
            hasUser: false,
            userId: null,
            conversationId: '',
        };

        try {
            const user = await User.query().where('email', email).where('id', '<>', userId).first();

            if (user !== null) {
                const chatItem = await ChatItem.query()
                    .select('conversation_id')
                    .where('user_id', userId)
                    .where('contact_id', user?.id)
                    .first();

                res = {
                    hasUser: true,
                    userId: user?.id,
                    conversationId: chatItem ? chatItem?.conversationId : '',
                };

                return response.json(res);
            }
        } catch (error) {}

        return response.json(res);
    }
}
