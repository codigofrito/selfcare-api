const { knex } = require('../database')

const postTask = async (entity) => {
  return await knex("tasks")
    .insert(entity)
    .catch((error) => {
      return error
    })
    .then((dados) => {
      return dados
    })

}

const putTask = async (id, entity) => {
  return knex("tasks").where("id", id)
    .update(entity)
    .then((dados) => {
      if(!dados) return "Not found"
      return "Ok"
    })
}

const getAllTask = async () => {
  let result
  await knex("tasks").then((dados) => {
    result = dados
  })
  return result
}

const getByIdTask = async (id) => {
  let result
  await knex("tasks")
    .where("id", id)
    .then((dados) => {
      if (dados.length == 0) {
        result = "Nada Encontrado - Nothing found"
      } else {
        result = dados
      }
    })
  return result
}

const deleteTask = async (id) => {
  return await knex("tasks")
  .where("id", id)
  .delete()
  .then((dados) =>{
      if(!dados) return "Not found"
      return "Ok"
  })
}

module.exports = {
  postTask,
  putTask,
  getAllTask,
  getByIdTask,
  deleteTask
}
