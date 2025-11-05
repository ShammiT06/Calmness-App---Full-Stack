import express from "express";
import User from "../../models/User.js";
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"

const router = express.Router()

router.post("/", async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password should be at least 6 characters" })
        }


        const existingUser = await User.findOne({ email: email })
        if (existingUser) {
            return res.status(400).json({ message: "User ALready Exist" })
        }


        const user = new User({
            firstName,
            lastName,
            email,
            password
        })


       await user.save()


        const token = jwt.sign({ email: user.email }, process.env.Jwt_secret_key, { expiresIn: "1d" })

        const verificationLink = `https://wellness-backend-2-bd5h.onrender.com/api/verify/${token}`


        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.Myuser_email,
                pass: process.env.My_emailPass
            }
        })

        transporter.sendMail({
            from: process.env.Myuser_email,
            to: email,
            subject: "Verify Your Email",
            html: `
        <h3>Welcome ${firstName}!</h3>
        <p>Click below to verify your email:</p>
        <a href="${verificationLink}"
           style="background:#4CAF50;color:white;padding:10px 15px;text-decoration:none;border-radius:5px;">
           Verify Email
        </a>
        <p>This link will expire in 24 hours.</p>
      `,
        },
            function (error, info) {
                if (error) {
                    console.error("There is an Error", error)
                }
                else {
                    console.info("Mail sent successfully")
                }
            })


        res.status(200).json({ message: "User Registered Successfully and please Verify Your email" })


    } catch (error) {
        console.error("There is an error in Registration", error)

    }
})


export default router