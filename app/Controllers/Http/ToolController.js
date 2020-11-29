'use strict'

const { map } = require('bluebird');

const Tool = use("App/Models/Tool");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with tools
 */
class ToolController {
  /**
   * Show a list of all tools.
   * GET tools
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const { tag } = request.only('tag')
    const query = Tool.query().with('tags')
    if(tag) {
      query.whereHas('tags', builder => {
        builder.where('title', tag)
      })
    }
    return await query.fetch()
  }

  /**
   * Create/save a new tool.
   * POST tools
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.only(['title', 'link', 'description'])
    const tool = await Tool.create(data)
    const tags = request.input('tags')
    await tool.addTags(tags)
    response.status(201)
    return tool
  }

  /**
   * Display a single tool.
   * GET tools/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    return Tool.find(params.id)
  }

  /**
   * Update tool details.
   * PUT or PATCH tools/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a tool with id.
   * DELETE tools/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const tool = await Tool.findOrFail(params.id)
    tool.delete()
  }
}

module.exports = ToolController
