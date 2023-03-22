const jwt = require('jsonwebtoken')
const db =  require('../models')

const refreshToken = async(req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken
    if(!refreshToken) return res.status(401)
    const user = await db.User.findOne({
      where: {
        refresh_token: refreshToken
      }
    })
    if(!user) return res.status(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded)  => {
      if(err) return res.status(403).json({message: err.message})
      const accessToken = jwt.sign({id: user.id, name: user.name, email: user.email}, process.env.ACCESS_TOKEN, {
        expiresIn: '15s'
      })
      res.status(200).json({accessToken: accessToken})
    })
  } catch (error) {
    res.status(400).json({message: error.message})
  }
}

module.exports = {refreshToken}