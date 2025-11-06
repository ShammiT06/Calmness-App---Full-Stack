import express from "express";
import PDFDocument from "pdfkit";
import Journals from "../../models/Journal.js";

const router = express.Router();

router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const journals = await Journals.find({ UserId: userId })
            .sort({ date: -1 })
            .populate("UserId", "firstName email");

        if (!journals.length) {
            return res.status(404).json({ message: "No Report found for this User" });
        }

        const doc = new PDFDocument({ margin: 50, size: "Letter" });

        res.setHeader(
            "Content-Disposition",
            `attachment; filename=Journal_Report_${userId}.pdf`
        );
        res.setHeader("Content-Type", "application/pdf");

        doc.pipe(res);
        doc.fontSize(30).text("Calmness App", { align: "center" });
        doc.moveDown(1);

        doc.fontSize(20).text("Journal Report", { align: "center" });
        doc.moveDown(2);

        const user = journals[0].UserId;

        doc.fontSize(14).fillColor("black").text("User Info", { underline: true });
        doc.moveDown(1);
        doc.text(`Name: ${user.firstName}`);
        doc.text(`Email: ${user.email}`);
        doc.moveDown(1);
        journals.forEach((journal, index) => {
            doc.fontSize(15).fillColor("blue").text(`Entry ${index + 1}`, { underline: true });
            doc.moveDown(0.1);

            doc.fillColor("black").fontSize(12)
                .text(`Heading: ${journal.heading}`)
                .text(`Description: ${journal.description}`)
                .text(`Date: ${new Date(journal.date).toDateString()}`)
                .text(`Emotions: ${journal.emotions}`)
                .text(`Score: ${journal.score}`);

            doc.moveDown(1);
        });

        doc.moveDown(0.1);
        doc.fontSize(12).fillColor("gray").text(
            "Thanks for Using Our Calmness App",
            { align: "center" }
        );
        doc.moveDown(0.3)
        doc.fontSize(10).fillColor("gray").text("support@thirdvizion.com",{align:"left"})

        doc.end();

    } catch (error) {
        console.log("There is an error", error);
        res.status(500).json({ message: "There is an Error" });
    }
});

export default router;
