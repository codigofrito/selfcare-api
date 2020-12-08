const repository = require('../managers/taskManager')

const getAllTask = async () => {
  const result = await repository.getAllTask()
  return result
}

const getById = async (id) => {
  const response = await repository.getByIdTask(id)
  let result = {}
  result.message = response
  result.status = Array.isArray(response)
  return result
}

const postNewTask = async (body) => {
  const response = await repository.postTask(body)
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
  const response = await repository.putTask(id, body)
  return response
}

const deleteById = async (id) => {
  const response = await repository.deleteTask(id)
  return response
}

module.exports = {
  getAllTask,
  getById,
  postNewTask,
  deleteById,
  putById
}
