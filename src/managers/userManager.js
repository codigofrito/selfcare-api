const { knex } = require('../database')

const postUser = async (entity) => {
  return await knex("users")
    .insert(entity)
    .catch((error) => {
      return error
    })
    .then((dados) => {
      return dados
    })

}

const putUser = async (id, entity) => {
  return knex("users").where("id", id)
    .update(entity)
    .then((dados) => {
      if(!dados) return "Id não encontrado - Nothing found"
      return "Ok"
    })
}

const getAllUser = async () => {
  let result
  await knex("users").then((dados) => {
    result = dados
  })
  return result
}

const getByIdUser = async (id) => {
  let result
  await knex("users")
    .where("id", id)
    .then((dados) => {
      if (dados.length == 0) {
        result = "Id não encontrado - Nothing found"
      } else {
        result = dados
      }
    })
  return result
}

const deleteUser = async (id) => {
  return await knex("users")
  .where("id", id)
  .delete()
  .then((dados) =>{
      if(!dados) return "Id não encontrado - Nothing found"
      return "Ok"
  })
}

module.exports = {
  postUser,
  putUser,
  getAllUser,
  getByIdUser,
  deleteUser
}
