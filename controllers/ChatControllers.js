const db = require('../models')

const createRoom = async(req, res) => {
  try {
    const roomId = await Math.round(Math.random() * (9999 - 1000) + 1000)
    await db.ChatRoom.create({
      room: roomId,
      user_id: req.body.user_id,
      consultant_id: req.body.consultant_id,
    })
    res.status(200).json({
      message: 'Room Created',
      room: roomId
    })
  } catch (error) {
    res.status(400).json({message: error.message})
  }
}

const getRoom = async(req, res) => {
  try {
    const room = await db.ChatRoom.findOne({
      attributes: ['room'],
      where: {
          user_id: req.body.user_id,
          consultant_id: req.body.consultant_id
      }
    })
    res.status(200).json(room)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
}

const getChatList =  async(req, res) => {
  try {
      const result = await db.ChatRoom.findAll({
        where: {
          consultant_id: req.params.id
        },
        include: [{
            model: db.User,
            as: 'Client',
            attributes: ['name']
        }]
      })
      res.status(200).json({result})
  } catch (error) {
      res.status(400).json({message: error.message})
  }
}

module.exports = {createRoom, getRoom, getChatList}