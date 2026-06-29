const User = require('../models/user.model');
// const userService = require('../services/user.service');
const {createUser} = require('../services/user.service');
const { validationResult } = require('express-validator');

const registerUser = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    const isUserAlready = await User.findOne({ email });
    if (isUserAlready) return res.status(400).json({ message: 'User already exist' });

    const hashedPassword = await User.hashPassword(password);

    const user = await createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({ token, user });
}


module.exports = { 
    registerUser
};