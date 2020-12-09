const { knex } = require('../database')

const postNew = async (entity) => {
  return await knex("task_history")
    .insert(entity)
    .catch((error) => {
      return error
    })
    .then((dados) => {
      return dados
    })

}

const putEdit = async (entity) => {
  return knex("task_history").where({
    "users_has_tasks_user_id": entity.users_has_tasks_user_id,
    "users_has_tasks_task_id": entity.users_has_tasks_task_id
  }).update({
    "done": entity.done
  })
    .then((dados) => {
      if (!dados) return "Id não encontrado - Nothing found"
      return "Ok"
    })
}

const getAll = async () => {
  let result
  //"task_history.users_has_tasks_user_id = users_has_tasks.user_id and task_history.users_has_tasks_task_id = users_has_tasks.task_id"
  await knex.select('*').from("task_history")
    .join("users_has_tasks", function () {
      this.on(function () {
        this.on("task_history.users_has_tasks_user_id", "=", "users_has_tasks.user_id")
        this.andOn("task_history.users_has_tasks_task_id", "=", "users_has_tasks.task_id")
      })
    })
    .then((dados) => {
      result = dados
    })
  return result
}

const getByIdUser = async (user_id) => {
  let result
  await knex("task_history")
    .join("users_has_tasks", function () {
      this.on(function () {
        this.on("task_history.users_has_tasks_user_id", "=", "users_has_tasks.user_id")
        this.andOn("task_history.users_has_tasks_task_id", "=", "users_has_tasks.task_id")
      })
    })
    .where({
      "users_has_tasks_user_id": user_id
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

const getByIdTask = async (task_id) => {
  let result
  await knex("task_history")
    .join("users_has_tasks", function () {
      this.on(function () {
        this.on("task_history.users_has_tasks_user_id", "=", "users_has_tasks.user_id")
        this.andOn("task_history.users_has_tasks_task_id", "=", "users_has_tasks.task_id")
      })
    })
    .where({
      "users_has_tasks_task_id": task_id
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

const getByIdDual = async (task_id, user_id) => {
  let result
  await knex("task_history")
    .join("users_has_tasks", function () {
      this.on(function () {
        this.on("task_history.users_has_tasks_user_id", "=", "users_has_tasks.user_id")
        this.andOn("task_history.users_has_tasks_task_id", "=", "users_has_tasks.task_id")
      })
    })
    .where({
      "users_has_tasks_user_id": user_id,
      "users_has_tasks_task_id": task_id
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

const getByIdDual2 = async (task_id, user_id) => {
  let result
  await knex("task_history")
    .innerJoin("users_has_tasks","task_history.users_has_tasks_user_id", "=", "users_has_tasks.user_id")
    .and( "task_history.users_has_tasks_task_id", "=", "users_has_tasks.task_id")
    .where({
      "users_has_tasks_user_id": user_id,
      "users_has_tasks_task_id": task_id
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
  return await knex("task_history")
    .where({
      "users_has_tasks_user_id": user_id,
      "users_has_tasks_task_id": task_id
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
  getByIdUser,
  getByIdTask,
  getByIdDual,
  getByIdDual2,
  getAll,
  deleteById
}
