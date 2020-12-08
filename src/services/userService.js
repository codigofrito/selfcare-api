const repository = require('../managers/userManager')

const getAllUser = async () => {
  const result = await repository.getAllUser()
  return result
}

const getById = async (id) => {
  const response = await repository.getByIdUser(id)
  let result = {}
  result.message = response
  result.status = Array.isArray(response)
  return result
}

const postNewUser = async (body) => {
  const response = await repository.postUser(body)
  let result = {}
  if (response.sqlMessage) {
    result.message = response.sqlMessage
    result.statu = Array.isArray(response)
  } else {
    result.message = response[0]
    result.statu = Array.isArray(response)
  }
  return result
}

const putById = async (id, body) => {
  const response = await repository.putUser(id, body)
  return response
}

const deleteById = async (id) => {
  const response = await repository.deleteUser(id)
  return response
}

module.exports = {
  getAllUser,
  getById,
  postNewUser,
  deleteById,
  putById
}
