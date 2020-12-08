const errorRepository = require('../data/repositories/errorRepository.js')
const httpResponse = require('./httpResponse')
const moment = require('moment')

const handleAsync = async (
  expressResponse,
  origin,
  controllerName,
  requestBody,
  response,
  exception
) => {
  const entity = {
    origin: origin,
    controller: controllerName,
    when: Date.now(),
    request: requestBody ? JSON.stringify(requestBody) : null,
    response: response ? JSON.stringify(response) : null,
    exception: exception
  }
  await errorRepository.create(entity)
  const dateHour = moment().format()
  console.error('An error happend, please check the logs! ' + dateHour)
  console.error(exception)
}

module.exports = {
  handleAsync
}
