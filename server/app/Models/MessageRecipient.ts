import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm';
import { DateTime } from 'luxon';
import Message from './Message';
import User from './User';

export default class MessageRecipient extends BaseModel {
    @column({ isPrimary: true })
    public id: number;

    @column()
    public recipientId: number;

    @column()
    public messageId: number;

    @column()
    public isSeen: boolean = false;

    @column.dateTime({ autoCreate: false, autoUpdate: false })
    public seenAt: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public sentAt: DateTime;

    @belongsTo(() => Message, {
        localKey: 'messageId',
        foreignKey: 'id',
    })
    public message: BelongsTo<typeof Message>;

    @hasOne(() => User, {
        localKey: 'recipientId',
        foreignKey: 'id',
    })
    public user: HasOne<typeof User>;
}
