const repository = require('../managers/taskHistoryManager')

const getAll = async () => {
  const result = await repository.getAll()
  return formatJson(result)
}

const getById = async (bodyJson) => {
  let response
  let result = {}
  if (Object.keys(bodyJson).length == 2) {
    response = await repository.getByIdDual(bodyJson.users_has_tasks_task_id, bodyJson.users_has_tasks_user_id)
  } else {
    if (bodyJson.users_has_tasks_task_id){
      response = await repository.getByIdTask(bodyJson.users_has_tasks_task_id)
    } else{
      response = await repository.getByIdUser(bodyJson.users_has_tasks_user_id)
    }
  }
  result.status = Array.isArray(response)
  if (result.status) {
    result.message = formatJson(response)
  } else {
    result.message = response
  }
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
  const response = await repository.deleteById(bodyJson.users_has_tasks_user_id, bodyJson.users_has_tasks_task_id)
  return response
}

const formatJson = (resultQuery) => {
  const newJson = new Array()
  resultQuery.map((item) => {
    let newObjeto
    newObjeto = {
      done: item.done,
      users_has_tasks: {
        users_has_tasks_task_id: item.users_has_tasks_task_id,
        task_id: item.task_id,
        users_has_tasks_user_id: item.users_has_tasks_user_id,
        user_id: item.user_id,
        push_notification: item.push_notification,
        period: item.period,
        schedule: item.schedule
      },
      created_at: item.created_at,
      updated_at: item.updated_at
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
