import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
    protected tableName = 'chat_items';

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.bigIncrements('id').primary();
            table.bigInteger('user_id').unsigned().references('id').inTable('users');
            table
                .string('conversation_id', 50)
                .references('conversation_id')
                .inTable('conversations');
            table.bigInteger('contact_id');
            table.boolean('is_requestor').notNullable().defaultTo(true);
            table.timestamp('requested_at', { useTz: true });
        });

        this.schema.alterTable('chat_items', (table) => {
            table.unique(['user_id', 'conversation_id', 'contact_id']);
        });
    }

    public async down() {
        this.schema.dropTable(this.tableName);
    }
}
