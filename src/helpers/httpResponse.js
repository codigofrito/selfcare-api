const isSuccess = response => {
  return response && (response.status === 200 || response.status === 201)
}

const throwErrorOnFail = (response, from) => {
  if (!isSuccess(response)) {
    throw new Error(`Invalid response from ${from}.`)
  }
}

const replyBadRequest = (res, exception) => {
  res.status(500)
  res.send(exception.message)
}

module.exports = {
  isSuccess,
  throwErrorOnFail,
  replyBadRequest
}
