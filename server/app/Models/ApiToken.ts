import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';
import { DateTime } from 'luxon';

export default class ApiToken extends BaseModel {
    @column({ isPrimary: true })
    public id: number;

    @column()
    public userId: number;

    @column()
    public name: string;

    @column()
    public token: string;

    @column()
    public isExpired: boolean = false;

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime;
}
