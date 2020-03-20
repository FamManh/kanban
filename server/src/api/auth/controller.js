const User = require("../user/model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {jwtSecret, jwtExpirationInterval} = require('../../config/vars')
const {omit} = require('lodash')
const moment = require('moment');
const httpStatus = require('http-status')


const generateTokenResponse = (user, accessToken)=>{
    const expiresIn = moment().add(jwtExpirationInterval, 'minutes');
    return {
        accessToken, expiresIn
    }
}

exports.register = async (req, res, next) => {
    try {
        const userData = omit(req.body, 'role');
        const user = await new User(userData).save();
        const userTransformed = user.transoform();
        const token = generateTokenResponse(userTransformed, user.token());
        res.status(httpStatus.CREATED);
        
        return res.json({ token, userTransformed });
    } catch (error) {
        next(User.checkDuplicateEmail(error));
    }
};

exports.login = async (req, res, next) => {
    try {
        const { user, accessToken } = await User.findAndGenerateToken(req.body);
        const token = generateTokenResponse(user, accessToken);
        const userTransformed = user.transoform();
        return res.json({token, user: userTransformed})
    } catch (error) {
        next(error)
    }
};
