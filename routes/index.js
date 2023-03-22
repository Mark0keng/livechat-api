const express = require('express')
const {createUser, getUser, getConsultant, getConsultantDetail} = require('../controllers/UserController.js')
const {createRoom, getRoom, getChatList} = require('../controllers/ChatControllers.js')
const {refreshToken} = require('../controllers/RefreshToken.js')
const {login, logout} = require('../controllers/AuthControllers.js')
const {verifyToken} = require('../middleware/VerifyToken.js')
const router = express.Router()

// Auth Route
router.get('/token', refreshToken)
router.post('/login', login)
router.post('/logout', logout)

// User Route
router.post('/user', createUser)
router.get('/user', verifyToken, getUser)
router.get('/consultants', verifyToken, getConsultant)
router.get('/consultant/:id', verifyToken, getConsultantDetail)

// Chat Route
router.post('/room', verifyToken, createRoom)
router.post('/find-room', verifyToken, getRoom)
router.get('/chatlist/:id', verifyToken, getChatList)

module.exports = {router}