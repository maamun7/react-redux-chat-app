import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
    protected tableName = 'messages';

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.bigIncrements('id').primary();
            table
                .string('conversation_id', 50)
                .references('conversation_id')
                .inTable('conversations');
            table.text('message', 'longtext').notNullable();
            table.bigInteger('parent_id');
            table.bigInteger('created_by').unsigned().references('id').inTable('users');
            table.timestamp('created_at', { useTz: true });
            table.boolean('is_edited').notNullable().defaultTo(false);
            table.timestamp('edited_at', { useTz: true }).nullable();
            table.boolean('is_deleted').notNullable().defaultTo(false);
            table.timestamp('deleted_at', { useTz: true }).nullable();
        });
    }

    public async down() {
        this.schema.dropTable(this.tableName);
    }
}
