import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
    protected tableName = 'conversations';

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.bigIncrements('id').primary();
            table.string('conversation_id', 50).unique();
            table.string('title').nullable();
            table.enu('type', ['single', 'group']).defaultTo('single');
            table.bigInteger('created_by').unsigned().references('id').inTable('users');
            table.timestamp('created_at', { useTz: true });
            table.timestamp('updated_at', { useTz: true }).nullable();
        });
    }

    public async down() {
        this.schema.dropTable(this.tableName);
    }
}
