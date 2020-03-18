const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const saltRounds = 1;
var jwt = require("jsonwebtoken");
const privateKey = "SDFASDFASHJDFJASJDFH";

exports.register = async (req, res) => {
    try {
        bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
            if (err) {
                throw new Error("Error");
            }
            await User.create({ ...req.body, password: hash });
            res.json({ message: "succesfuly" });
        });
        return;
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
};

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            // check !user
            return res.status(400).json({
                error: "User with this email does not exists."
            });
        }

        // hash pasword
        await bcrypt.compare(req.body.password, user.password, function(
            err,
            result
        ) {
            
            if (!result) {
                // error
                return res
                    .status(400)
                    .json({ error: "Email or password incorrect" });
            }

            // generate jsonwebtoken
            const token = jwt.sign(
                { id: user.id, email: user.email },
                privateKey,
                { expiresIn: "1h" }
            );
            return res.json({ user, token });
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
};
