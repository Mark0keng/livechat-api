const jwt = require("jsonwebtoken")

const verifyToken = async(req, res, next) => {
  try {
    const headerAuth = req.headers.authorization
    const accessToken = headerAuth && headerAuth.split(' ')[1]
    if(accessToken == null) return res.sendStatus(401)
    jwt.verify(accessToken, process.env.ACCESS_TOKEN, (err, decoded) => {
      if(err) return res.sendStatus(403)
      req.email = decoded.email
      next()
    })
  } catch (error) {
    res.status(400).json({message: error.message})
  }
}

module.exports = {verifyToken}