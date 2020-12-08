const { knex } = require('../database')

const postNew = async (entity) => {
  return await knex("users_has_tasks")
    .insert(entity)
    .catch((error) => {
      return error
    })
    .then((dados) => {
      return dados
    })

}

const putEdit = async (entity) => {
  return knex("users_has_tasks").where({
    "user_id": entity.user_id,
    "task_id": entity.task_id
  }).update({
    "push_notification": entity.push_notification,
    "period": entity.period,
    "schedule": entity.schedule
  })
    .then((dados) => {
      if (!dados) return "Id não encontrado - Nothing found"
      return "Ok"
    })
}

const getAll = async () => {
  let result
  await knex("users_has_tasks")
  .innerJoin("users", "users_has_tasks.user_id", "=", "users.id")
  .innerJoin("tasks", "users_has_tasks.task_id", "=", "tasks.id")
  .then((dados) => {
    result = dados
  })
  return result
}

const getById = async (task_id, user_id) => {
  let result
  await knex("users_has_tasks")
    .where({
      "user_id": user_id,
      "task_id": task_id
    })
    .then((dados) => {
      if (dados.length == 0) {
        result = "Id não encontrado - Nothing found"
      } else {
        result = dados
      }
    })
  return result
}

const deleteById = async (user_id, task_id) => {
  return await knex("users_has_tasks")
    .where({
      "user_id": user_id,
      "task_id": task_id
    })
    .delete()
    .then((dados) => {
      if (!dados) return "Id não encontrado - Nothing found"
      return "Ok"
    })
}

module.exports = {
  postNew,
  putEdit,
  getById,
  getAll,
  deleteById
}
