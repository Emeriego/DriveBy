const { User } = require('../models');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const { sequelize, DataTypes } = require('../models/index');
const sendResetPasswordMail = async function (firstname, lastname, email, token) {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Reset password mail',
            html: `<p> Jai Shree Ram ${firstname} ${lastname}, please copy the link <a href="http://localhost:5000/manage-password/reset-password?token=${token}"> reset your password</a>`
        };
        transporter.sendMail(mailOptions)
            .then(info => {
                console.log('Mail has been sent with info : ' + info.response);
            })
            .catch(error => {
                console.log('Error while sending the mail : ' + error);
            });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
};

const forgotPasswordController = async function (req, res) {
    try {
        const bodyEmail = req.body.email;
        const userFound = await User.findOne({ where: { email: bodyEmail } });
        if (!userFound) {
            return res.status(200).send({
                success: true,
                message: 'User not found, enter a valid email address'
            });
        }

        const randomString = randomstring.generate();
        await User.update({ passwordToken: randomString }, { where: { email: bodyEmail } });

        sendResetPasswordMail(userFound.firstname, userFound.lastname, bodyEmail, randomString);

        return res.status(200).send({
            success: true,
            message: 'Reset password mail has been sent to your gmail account, please check your inbox or spam folder'
        });

    } catch (error) {
        return res.status(400).send({
            success: false,
            message: 'Error in forgotPasswordController Public API',
            error: error.message
        });
    }
}

const resetPasswordController = async function (req, res) {
    try {
        const newPassword = req.body.password;
        const token = req.body.token; // Get token from request body

        // Check if newPassword and token are provided
        if (!newPassword || !token) {
            return res.status(400).send({
                success: false,
                message: 'New password and token are required'
            });
        }

        const user = await User.findOne({ where: { passwordToken: token } });

        // Check if user is found
        if (!user) {
            return res.status(200).send({
                success: false,
                message: 'The link has been expired'
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        await User.update({ password: hashedPassword, passwordToken: '' }, { where: { id: user.id } });

        return res.status(200).send({
            success: true,
            message: 'Password reset successful'
        });

    } catch (error) {
        console.log('Error in resetPasswordController:', error);
        return res.status(500).send({
            success: false,
            message: 'Error in resetPasswordController Private API',
            error: error.message
        });
    }
}
module.exports = {
    forgotPasswordController,
    resetPasswordController
};