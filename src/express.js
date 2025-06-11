const express = require("express");
const cors = require("cors");
const multer = require("multer");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();
const upload = multer(); // For handling multipart/form-data
app.use(cors());
app.use(express.json());

app.post("/send-email", upload.single("file"), async (req, res) => {
  const { to, subject, message } = req.body;
  const file = req.file;

  try {
    const msg = {
      to,
      from: "vikumar@billowllc.com", // Verified sender
      subject,
      text: message,
      html: `<strong>${message}</strong>`,
      attachments: file
        ? [
            {
              content: file.buffer.toString("base64"),
              filename: file.originalname,
              type: file.mimetype,
              disposition: "attachment",
            },
          ]
        : [],
    };

    await sgMail.send(msg);
    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error(error.response?.body || error.message);
    res.status(500).json({ success: false, message: "Email failed to send." });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
