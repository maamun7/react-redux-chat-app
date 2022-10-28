import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm';
import { DateTime } from 'luxon';
import ChatItem from './ChatItem';

export default class Conversation extends BaseModel {
    @column({ isPrimary: true })
    public id: number;

    @column()
    public conversationId: string;

    @column()
    public title: string;

    @column()
    public createdBy: number;

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime;

    @hasMany(() => ChatItem, {
        localKey: 'conversationId',
        foreignKey: 'conversationId',
    })
    public chatItem: HasMany<typeof ChatItem>;
}
