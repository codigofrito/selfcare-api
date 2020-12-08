const config = require('config')

const getMongoUrl = () => {
  const mongodbUrl = config.get('database.mongoUrl')

  if (!mongodbUrl) {
    throw new Error('The mongo url was not found on config.')
  }

  return mongodbUrl
}

module.exports = {
  getMongoUrl
}
