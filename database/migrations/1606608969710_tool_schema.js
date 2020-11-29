'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ToolSchema extends Schema {
  up () {
    this.create('tools', (table) => {
      table.uuid('id').primary()
      table.string('title').notNullable()
      table.string('link').notNullable()
      table.text('description').nullable()
    })
  }

  down () {
    this.drop('tools')
  }
}

module.exports = ToolSchema
