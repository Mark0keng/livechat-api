const db = require('../models')
const bcrypt = require('bcrypt')

const createUser = async(req, res) => {
    const {name, email, password, confirmPassword} = req.body
    if(password !== confirmPassword)
    return res.status(400).json({message: "Password dan konfirmasi password tidak cocok"})
    const hashPassword = await bcrypt.hash(password, 10)
    try {
        await db.User.create({
            name: name,
            email: email,
            password: hashPassword,
        })
        res.status(201).json({message: 'Register Berhasil'})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const getUser = async(req, res) => {
    try {
        const user = await db.User.findAll()
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const getConsultant =  async(req, res) => {
    try {
        const consultant = await db.ConsultantInformation.findAll({
            attributes: ['user_id', 'specialist', 'work_experience', 'slug', 'photo'],
            include: [{
                model: db.User,
                attributes: ['name']
            }, {
                model: db.ConsultantOffice,
                attributes: ['name', 'address']
            }]
        })
        res.status(200).json({result: consultant})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const getConsultantDetail = async(req, res) => {
    try {
        const result = await db.ConsultantInformation.findOne({
            where: {
                user_id: req.params.id
            },
            include: [{
                model: db.User,
                attributes: ['name', 'uuid'] 
            }, {
                model: db.ConsultantOffice,
                attributes: ['name', 'address']
            }]
        })
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({result: error.message})
    }
}
module.exports = {createUser, getUser, getConsultant, getConsultantDetail}