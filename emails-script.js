const nodemailer = require('nodemailer');
const { MAIL_USER, MAIL_PASS, DB } = require('./config.json');
const mongoose = require('mongoose');
const crypto = require('crypto');
const AuthCode = require('./models/authCode.model.js');

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((connection) => {
    console.log("connected to the database");
}).catch((err) => {
    console.log("error while connecting to database: ", err);
});





async function sendEmail(to, msg) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: MAIL_USER,
            pass: MAIL_PASS
        }
    });

    let info = await transporter.sendMail({
        from: "jm_boumendjel@esi.dz",
        to,
        subject: 'authCode for hacktik-RH-app',
        text: msg
    })

    console.log("info: ", info);
}


let receivers = ["is20lam01@gmail.com"];


receivers.forEach( async (receiver) => {
    let code = crypto.randomBytes(10).toString('hex');
    let authCode = new AuthCode({code});
    try {
        await authCode.save();
        let message = `salam, here is your authCode for our hacktic-RH-app: ${code}`;
        sendEmail(receiver, message);
    } catch(err) {
        console.log(err);
    }
});




