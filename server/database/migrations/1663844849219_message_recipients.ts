import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
    protected tableName = 'message_recipients';

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.bigIncrements('id').primary();
            table.bigInteger('recipient_id').notNullable();
            table.bigInteger('message_id').unsigned().references('id').inTable('messages');
            table.boolean('is_seen').notNullable().defaultTo(false);
            table.timestamp('seen_at', { useTz: true }).nullable();
            table.timestamp('sent_at', { useTz: true }).nullable();
        });
    }

    public async down() {
        this.schema.dropTable(this.tableName);
    }
}
