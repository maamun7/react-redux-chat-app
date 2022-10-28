import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class ApiTokens extends BaseSchema {
    protected tableName = 'api_tokens';

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.bigIncrements('id').primary();
            table.bigInteger('user_id').unsigned().references('id').inTable('users');
            table.string('name').notNullable();
            table.string('type').notNullable();
            table.string('token', 64).notNullable().unique();
            table.boolean('is_expired').notNullable().defaultTo(false);
            table.timestamp('created_at', { useTz: true });
            table.timestamp('expires_at', { useTz: true }).nullable();
        });
    }

    public async down() {
        this.schema.dropTable(this.tableName);
    }
}
