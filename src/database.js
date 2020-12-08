const config = require('config')
const configurationManager = require('./managers/configurationManager')

const mongoose = require('mongoose')
const knex = require('knex')(config.get('database.mySql'))



const startAsync = async () => {
  const mongodbUrl = configurationManager.getMongoUrl()

  await mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  mongoose.set('useFindAndModify', false)
}

const stopAsync = async () => {
  await mongoose.disconnect()
}

module.exports = {
  startAsync,
  stopAsync,
  knex
}
