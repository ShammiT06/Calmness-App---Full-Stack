import express from "express"
import jwt from "jsonwebtoken"
import User from "../../models/User.js"

const router = express.Router()

router.get("/:token", async (req, res) => {
    try {
        const { token } = req.params


        const decoded = jwt.verify(token, process.env.Jwt_secret_key)
        const user = await User.findOne({ email: decoded.email })

        if (!user) {
            res.status(400).send("<h3>Invalid Verification Link</h3>")
        }
        if (user.isVerified) {
            return res.send("<h3>Email Already Verified</h3>")
        }


        user.isVerified = true
        user.save()


        res.send(`<div>
            <h3>Email Verified Successfully!</h3>
            <p>You can Login Now </p></div>`)

    }
    catch (error) {
        console.error("Something Went Wrong", error)
        res.status(400).send("Internal Server Error")
    }
})
export default router