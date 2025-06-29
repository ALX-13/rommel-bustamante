const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors({
  origin: 'https://alx-13.github.io',
  methods: ['POST'],
}));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'leonardobravoricapa@gmail.com',
    pass: 'llqe vtzd oqfg vagi'
  }
});

app.post("/send", (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: `"${name}" <leonardobravoricapa@gmail.com>`,
    replyTo: email,
    to: 'tenorio.rommel15@gmail.com',
    subject: `Mensaje de ${name}`,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error al enviar:", error);
      return res.status(500).json({ success: false });
    }
      console.log("Correo enviado:", info.response);
      res.json({ success: true });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
