'use strict'

const Tag = use("App/Models/Tag")

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Tool extends Model {
    static boot() {
        super.boot();
        this.addHook("beforeCreate", "UuidHook.uuid");
    }

    static get primaryKey() {
        return "id";
    }

    static get incrementing() {
        return false;
    }

    static get createdAtColumn () {
        return null
    }

    static get updatedAtColumn () {
        return null
    }

    async addTags(tags) {
        tags.map(async title => {
            const tag = {title}
            const tagModel = await Tag.findOrCreate(tag, tag)
            this.tags().attach(tagModel.id)
        })
    }

    tags() {
        return this.belongsToMany('App/Models/Tag').pivotTable('tool_tag')
    }
}

module.exports = Tool
