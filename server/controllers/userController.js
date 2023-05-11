const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')

const generateJwt = (id, first_name, last_name, email, role) => {
    return jwt.sign(
        {id, first_name, last_name, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {first_name, last_name, email, password, role} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Incorrect xxxx an email or a password'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('The User with this email already exists'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({first_name, last_name, email, role, password: hashPassword})
        const basket = await Basket.create({userId: user.id})
        const token = generateJwt(user.id, user.first_name, user.last_name, user.last_name, user.role)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('The User is not found'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Wrong password specified'))
        }
        const token = generateJwt(user.id, user.first_name, user.last_name, user.email, user.role)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

    async getAll(req,res) {
        const users = await User.findAll();
        return res.json({users})
    }
}

module.exports = new UserController()
