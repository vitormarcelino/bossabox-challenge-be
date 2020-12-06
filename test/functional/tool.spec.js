'use strict'
const suite = use('Test/Suite')('Tool')

const Tool = use("App/Models/Tool")

suite.trait('Test/ApiClient')

const tools = [
  {
    title: "Notion",
    link: "https://notion.so",
    description: "All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ",
      tags: [
        "organization",
        "planning",
        "collaboration",
        "writing",
        "calendar"
      ]
  },
  {
    title: "json-server",
    link: "https://github.com/typicode/json-server",
    description: "Fake REST API based on a json schema. Useful for mocking and creating APIs for front-end devs to consume in coding challenges.",
    tags: [
        "api",
        "json",
        "schema",
        "node",
        "github",
        "rest"
    ]
  },
  {
    title: "fastify",
    link: "https://www.fastify.io/",
    description: "Extremely fast and simple, low-overhead web framework for NodeJS. Supports HTTP2.",
    tags: [
        "web",
        "framework",
        "node",
        "http2",
        "https",
        "localhost"
    ]
  }
]

suite.before(async () => {
  await tools.map(async t => {
    let tags = t.tags
    delete t.tags
    const tool = await Tool.create(t)
    await tool.addTags(tags)
  })
  let sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  await sleep(200)
})

suite.test('list tools', async ({ assert, client }) => {
  let response = await client.get('/tools').end()
  assert.equal(response.body.length, tools.length)
  response.assertStatus(200)
})

suite.test('insert new tool', async ({ assert, client }) => {
  let response = await client.post('/tools').send({
    title: "Jira",
    link: "https://www.atlassian.com/software/jira",
    description: "The #1 software development tool used by agile teams",
    tags: [
      'task',
      'managerm',
      'project',
      'agile'
    ]
  }).end()
  response.assertStatus(201)
})

suite.test('filter tools', async ({ assert, client }) => {
  
  let response = await client.get('/tools?tag=organization').end()
  response.assertStatus(200)
  assert.equal(response.body.length, 1)
})

suite.test('removing tool', async ({ assert, client }) => {
  let response = await client.get('/tools').end()
  response.assertStatus(200)
  const idToRemove = response.body[0].id
  let deleteResponse = await client.delete(`/tools/${idToRemove}`).end()
  deleteResponse.assertStatus(204)
})