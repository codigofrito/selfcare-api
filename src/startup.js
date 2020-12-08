const database = require('./database')
const api = require('./api')

const startAsync = async () => {
  console.info(`Using environment: ${process.env.NODE_ENV}`)
  console.info(`Process id: ${process.pid}`)

  console.info('Starting database...')
  await database.startAsync()

  console.info('Starting api...')
  api.start()
}

const stopAsync = async () => {
   console.info('Stopping database...')
   await database.stopAsync()

  console.info('Stopping api...')
  api.stop()

  console.info('Finished.')
}

;(async () => {
  try {
    await startAsync()
    ;['SIGINT', 'SIGTERM', 'SIGQUIT'].map(signal =>
      process.on(signal, async () => {
        await stopAsync()
        process.exit(0)
      })
    )
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})()
