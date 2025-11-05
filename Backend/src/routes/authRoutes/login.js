import express from "express"
import jwt from "jsonwebtoken"
import User from "../../models/User.js"
import bcrypt from "bcryptjs"

const router = express.Router()


router.post("/", async (req, res) => {
    try {
        const { userEmail, password } = req.body
        if (!userEmail || !password) {
            return res.status(400).json("All Fill all the Fields")
        }
        const user = await User.findOne({ email: userEmail })

        if (!user) {
            res.status(400).json("User not Found")
        }
        if (!user.isVerified) {
            return res.status(403).json({ message: "Please verify your email before login" });
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json("Invalied Credientials")
        }


        const token = jwt.sign({id:user._id,email:user.email},process.env.Jwt_secret_key,{expiresIn:"7d"})


        res.status(200).json({
            message: "Logged In Successfully",
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        })


    } catch (error) {
        console.error("Something Went Wrong", error)

        res.status(400).json("Internal Server Error")

    }

})


export default router