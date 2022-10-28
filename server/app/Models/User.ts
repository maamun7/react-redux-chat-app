import Hash from '@ioc:Adonis/Core/Hash';
import { BaseModel, beforeSave, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm';
import { DateTime } from 'luxon';
import MessageRecipient from './MessageRecipient';

export default class User extends BaseModel {
    @column({ isPrimary: true })
    public id: number;

    @column()
    public name: string;

    @column()
    public email: string;

    @column({ serializeAs: null })
    public password: string;

    @column()
    public avatar: string | null;

    @column()
    public isActive: boolean = true;

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime;

    @beforeSave()
    public static async hashPassword(user: User) {
        if (user.$dirty.password) {
            user.password = await Hash.make(user.password);
        }
    }

    @hasMany(() => MessageRecipient, {
        localKey: 'id',
        foreignKey: 'recipientId',
    })
    public recipients: HasMany<typeof MessageRecipient>;
}
