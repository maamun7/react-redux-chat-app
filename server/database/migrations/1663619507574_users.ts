import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
    protected tableName = 'users';

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.bigIncrements('id');
            table.string('name').notNullable();
            table.string('email').notNullable().unique();
            table.string('password').notNullable();
            table.string('avatar').nullable();
            table.boolean('is_active').notNullable().defaultTo(false);
            table.string('remember_token').nullable();
            table.timestamp('created_at', { useTz: true });
            table.timestamp('updated_at', { useTz: true }).nullable();
        });
    }

    public async down() {
        this.schema.dropTable(this.tableName);
    }
}
