import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Todos extends BaseSchema {
  protected tableName = 'todos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().notNullable()
      table.timestamps()
      table.string('title'),
      table.boolean('is_completed')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
