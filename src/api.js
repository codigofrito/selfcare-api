const express = require( 'express')
const config = require( 'config')
const  bodyParser = require( 'body-parser')

const taskWebService = require ('./controllers/taskController')
const userWebService = require ('./controllers/userController')
const userHasTaskWebService = require ('./controllers/usersHasTasksController')
const taskHistoryWebService = require ('./controllers/taskHistoryController')

const apiPort = config.get('port')
const api = express()

let server

exports.start = () => {
  api.use(bodyParser.json())
  api.use(bodyParser.urlencoded({ extended: true }))
  api.use('/', taskWebService)
  api.use('/', userWebService)
  api.use('/', userHasTaskWebService)
  api.use('/', taskHistoryWebService)

  server = api.listen(
    apiPort,
    console.info(`Integration online, port: ${apiPort}`)
  )
}

exports.stop = () => {
  server.close(error => {
    if (error) {
      throw error
    }
  })
}
