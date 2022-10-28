import { BaseModel, column, HasMany, hasMany, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm';
import { DateTime } from 'luxon';
import Conversation from './Conversation';
import MessageRecipient from './MessageRecipient';

export default class Message extends BaseModel {
    @column({ isPrimary: true })
    public id: number;

    @column()
    public conversationId: string;

    @column()
    public message: string;

    @column()
    public parentId: number;

    @column()
    public createdBy: number;

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime;

    @column()
    public isEdited: boolean = false;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public editedAt: DateTime;

    @column()
    public isDeleted: boolean = false;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public deletedAt: DateTime;

    @hasOne(() => Conversation, {
        localKey: 'conversationId',
        foreignKey: 'conversationId',
    })
    public user: HasOne<typeof Conversation>;

    @hasMany(() => MessageRecipient, {
        localKey: 'id',
        foreignKey: 'messageId',
    })
    public recipients: HasMany<typeof MessageRecipient>;
}
