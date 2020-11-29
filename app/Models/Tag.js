'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Tag extends Model {
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
}

module.exports = Tag
