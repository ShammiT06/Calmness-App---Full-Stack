import express from "express";
import registerRoute from "./authRoutes/register.js";
import loginRoute from "./authRoutes/login.js"
import verifyRoute from "./authRoutes/verifyUser.js"
import ReportRoute from "./Journal/report.js"
import getJournal from "./Journal/getReport.js"
import userData from "./Journal/getJournal.js"
import userUpdate from "./authRoutes/updateUser.js"
import downloadReport from "./Pdf/generatePdf.js"



const router = express.Router()

router.use('/register',registerRoute)
router.use("/login",loginRoute)
router.use("/verify",verifyRoute)
router.use("/journal",ReportRoute)
router.use("/getJournal",getJournal)
router.use("/userData",userData)
router.use("/userupdate",userUpdate)
router.use("/downloadpdf",downloadReport)
router.get("/",(req,res)=>{
    res.json({
        message:"Availabe API Endpoints",
        routes:[
            "/register",
            "/login",
            "/verify/:token",
            "/journal",
            "/getJournal/:userId",
            "/userData/:userId",
            "/userupdate/:email",
            "/downloadpdf"
        ]
    })
})


export default router