'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TagSchema extends Schema {
  up () {
    this.create('tags', (table) => {
      table.uuid('id').primary()
      table.string('title').notNullable()
    })
    this.create('tool_tag', (table) => {
      table.increments()
      table.uuid('tool_id').notNullable()
      table.uuid('tag_id').notNullable()
    })
  }

  down () {
    this.drop('tags')
    this.drop('tool_tag')
  }
}

module.exports = TagSchema
