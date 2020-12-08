const repository = require('../managers/usersHasTasksManager')

const getAll = async () => {
  const result = await repository.getAll()
  return formatJson(result)
}

const getById = async (bodyJson) => {
  const response = await repository.getById(bodyJson.task_id, bodyJson.user_id)
  let result = {}
  result.message = response
  result.status = Array.isArray(response)
  return result
}

const postNew = async (body) => {
  const response = await repository.postNew(body)
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

const putById = async (bodyJson) => {
  const response = await repository.putEdit(bodyJson)
  return response
}

const deleteById = async (bodyJson) => {
  const response = await repository.deleteById(bodyJson.user_id, bodyJson.task_id)
  return response
}

const formatJson = (resultQuery) => {
  const newJson = new Array()
  resultQuery.map((item) => {
    let newObjeto
    newObjeto = {
      push_notification: item.push_notification,
      period: item.period,
      schedule: item.schedule,
      user:
      {
        id: item.user_id,
        nome: item.name
      },
      task:
      {
        id: item.id,
        titulo: item.title,
        descricao: item.description,
        img: item.image_url
      }
    }
    newJson.push(newObjeto)
  })
  return newJson
}

module.exports = {
  getAll,
  getById,
  postNew,
  deleteById,
  putById
}
