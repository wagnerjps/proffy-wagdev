const express = require('express')
const ClassesController = require('./controllers/ClassesController')
const ConnectionsController = require('./controllers/ConnectionsController')

const routes = express.Router()

routes.get('/', (req, res) => {
    return res.json({ message: 'Hello World!'})
})

routes.get('/classes', ClassesController.index)
routes.post('/classes', ClassesController.create)


routes.get('/connections', ConnectionsController.index)
routes.post('/connections', ConnectionsController.create)

module.exports = routes