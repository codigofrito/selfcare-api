const express = require('express')
const moment = require('moment')
const exceptionHandler = require('../helpers/exceptionHandler')
const userService = require('../services/userService')

const router = express.Router()
const controllerName = 'users'

router.get(`/${controllerName}`, async (req, res) => {
  let reponse
  try {
    if (req.headers.oauth) {
      reponse = await userService.getAllUser()
      return res.status(200).send(reponse).send(console.log("capturing all the data successfully performed"))
    } else {
      return res.status(403).send("Você Não Tem Permissão Para Acessar Este Servidor (Forbidden – You Don't Have Permission to Access On This Server).")
    }
  } catch (error) {
    const dateHour = moment().format()
    await exceptionHandler.handleAsync(res, req.header('user-agent'), 'UserGetAll', req.body, reponse, error.message)
    res.status(400).send({
      Error: error.message,
      Date: dateHour
    })
  }
})

router.get(`/${controllerName}/:id`, async (req, res) => {
  let reponse
  try {
    if (req.headers.oauth) {
      const { id } = req.params
      reponse = await userService.getById(id)
      if (reponse.status == true) {
        return res.status(200).send(reponse.message).send(console.log("capturing all the data successfully performed"))
      } else {
        return res.status(400).send(reponse.message).send(console.log(reponse.message))
      }
    } else {
      return res.status(403).send("Você Não Tem Permissão Para Acessar Este Servidor (Forbidden – You Don't Have Permission to Access On This Server).")
    }

  } catch (error) {
    const dateHour = moment().format()
    await exceptionHandler.handleAsync(res, req.header('user-agent'), 'UserGetById', req.body, reponse, error.message)
    res.status(400).send({
      Error: error.message,
      Date: dateHour
    })
  }
})

router.post(`/${controllerName}`, async (req, res) => {
  let reponse
  try {

    if (req.headers.oauth) {
      reponse = await userService.postNewUser(req.body)
      const dateHour = moment().format()
      if (reponse.statu != false) {
        return res.sendStatus(200).send(reponse.message).send(console.log('Create New User concluded - ' + dateHour))
      } else {
        return res.status(400).send({
          Error: reponse.message,
          Date: dateHour
        })
      }
    } else {
      return res.status(403).send("Você Não Tem Permissão Para Acessar Este Servidor (Forbidden – You Don't Have Permission to Access On This Server).")
    }
  } catch (err) {
    const dateHour = moment().format()
    await exceptionHandler.handleAsync(res, req.header('user-agent'), 'emiteNfe', req.body, reponse, err.message)
    res.status(400).send({
      Error: err.message,
      Date: dateHour
    })
  }
})

router.delete(`/${controllerName}/:id`, async (req, res) => {
  let reponse
  try {
    if (req.headers.oauth) {
      const { id } = req.params
      reponse = await userService.deleteById(id)
      const dateHour = moment().format()
      if (reponse == "Ok") {
        return res.status(200).send("Successfully deleted").send(console.log("Successfully deleted - " + dateHour))
      } else {
        return res.status(400).send("Id not found or error").send(console.log("Id not found or error - " + dateHour))
      }
    } else {
      return res.status(403).send("Você Não Tem Permissão Para Acessar Este Servidor (Forbidden – You Don't Have Permission to Access On This Server).")
    }
  } catch (error) {
    const dateHour = moment().format()
    await exceptionHandler.handleAsync(res, req.header('user-agent'), 'UserGetById', req.body, reponse, error.message)
    res.status(400).send({
      Error: error.message,
      Date: dateHour
    })
  }
})

router.put(`/${controllerName}/:id`, async (req, res) => {
  let reponse
  try {
    if (req.headers.oauth) {
    const { id } = req.params
    reponse = await userService.putById(id, req.body)
    const dateHour = moment().format()
    if (reponse == "Ok") {
      return res.status(200).send("Update successfully").send(console.log("Update successfully - " + dateHour))
    } else {
      return res.status(400).send("Id not found or error").send(console.log("Id not found or error - " + dateHour))
    }
  } else {
    return res.status(403).send("Você Não Tem Permissão Para Acessar Este Servidor (Forbidden – You Don't Have Permission to Access On This Server).")
  }
  } catch (error) {
    const dateHour = moment().format()
    await exceptionHandler.handleAsync(res, req.header('user-agent'), 'UserGetById', req.body, reponse, error.message)
    res.status(400).send({
      Error: error.message,
      Date: dateHour
    })
  }
})

module.exports = router
