const express = require('express')
const SuperAdminController = require('../controllers/SuperAdminController')
const router = express.Router()


router.post('/add-user',SuperAdminController.insertuser)
router.post('/add-admin',SuperAdminController.insertadmin)


module.exports = router