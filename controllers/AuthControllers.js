const db = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = async(req, res) => {
    try {
        const user = await db.User.findOne({
          where: {
            email: req.body.email
          }
        })
        if(!user) return res.status(404).json({message: "Akun tidak ditemukan"})
        const match = await bcrypt.compare(req.body.password, user.password)
        if(!match) return res.status(400).json({message: "Email atau password anda salah!"})
        const refreshToken = jwt.sign({uuid: user.uuid}, process.env.REFRESH_TOKEN, {
          expiresIn: '1d',
        })
        const accessToken = jwt.sign({id: user.id, name:user.name, email:user.email}, process.env.ACCESS_TOKEN, {
          expiresIn: '10s',
        })
        await db.User.update({refresh_token: refreshToken}, {
          where:{
            id: user.id
          }
        })
        res.cookie('refreshToken', refreshToken, {
          maxAge: 60 * 60 * 24 * 1000,
          httpOnly: true
        })
        res.status(200).json({accessToken: accessToken})
        console.log(accessToken)
    } catch (error) {
        res.status(400).json({message: error.message,})
    }
}

const logout = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken
        if(!refreshToken) return res.sendStatus(204)
        console.log(refreshToken);
        const user = await db.User.findOne({
            where: {
                refresh_token: refreshToken
            }
        })
        
        if(!user) {
          res.clearCookie('refreshToken', {httpOnly: true, sameSite: 'None', secure: true})
          return res.sendStatus(204)
        }
        await db.User.update({refresh_token: null},{
            where:{
                id: user.id
            }
        })
        res.clearCookie('refreshToken', {httpOnly: true, sameSite: 'None', secure: true})
        res.sendStatus(204)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

module.exports = {login, logout}