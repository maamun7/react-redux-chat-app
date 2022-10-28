import {
    BaseModel,
    BelongsTo,
    belongsTo,
    column,
    HasMany,
    hasMany,
    HasOne,
    hasOne,
} from '@ioc:Adonis/Lucid/Orm';
import { DateTime } from 'luxon';
import Conversation from './Conversation';
import Message from './Message';
import User from './User';

export default class ChatItem extends BaseModel {
    @column({ isPrimary: true })
    public id: number;

    @column()
    public userId: number;

    @column()
    public conversationId: string;

    @column()
    public contactId: number;

    @column()
    public isRequestor: boolean = false;

    @column.dateTime({ autoCreate: true })
    public requestedAt: DateTime;

    @belongsTo(() => User, {
        localKey: 'userId',
        foreignKey: 'id',
    })
    public user: BelongsTo<typeof User>;

    @belongsTo(() => Conversation, {
        localKey: 'conversationId',
        foreignKey: 'conversationId',
    })
    public conversation: BelongsTo<typeof Conversation>;

    @hasMany(() => Message, {
        localKey: 'conversationId',
        foreignKey: 'conversationId',
    })
    public messages: HasMany<typeof Message>;

    @hasOne(() => User, {
        localKey: 'contactId',
        foreignKey: 'id',
    })
    public contact: HasOne<typeof User>;
}
