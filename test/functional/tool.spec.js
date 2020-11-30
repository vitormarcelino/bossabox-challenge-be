'use strict'
const { test, trait } = use('Test/Suite')('Tool')

trait('Test/ApiClient')


test('insert new tool', async ({ assert, client }) => {
  const notion = {
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
  }

  let response = await client.post('/tools').send(notion).end()
  response.assertStatus(201)
})

test('list tools', async ({ assert, client }) => {
  let response = await client.get('/tools').end()
  response.assertStatus(200)
})

test('removing tool', async ({ assert, client }) => {
  let response = await client.get('/tools').end()
  response.assertStatus(200)
  const idToRemove = response.body[0].id
  let deleteResponse = await client.delete(`/tools/${idToRemove}`).end()
  deleteResponse.assertStatus(204)
})
