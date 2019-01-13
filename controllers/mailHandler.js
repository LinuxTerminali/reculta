const async = require('async')
const nodemailer = require('nodemailer');

exports.sendEmail = async function(email,password){
    try{
        let createAccount  = await nodemailer.createTestAccount();
        if (createAccount.err) {
            throw "failed to send email"
        }
        // Create a SMTP transporter object
        let transporter = nodemailer.createTransport({
            host: createAccount.smtp.host,
            port: createAccount.smtp.port,
            secure: createAccount.smtp.secure,
            auth: {
                user: createAccount.user,
                pass: createAccount.pass
            }
        });
        // Message object
        let message = {
            from: 'Batman Development Service',
            to: email,
            subject: 'Your login credential',
            text: 'Hello your login credential is:',
            html: '<p>Hello your login credential is</p> <b>email:</b>'+email+' <br><b> password</b>:'+password
        };
        let sendEmail = await transporter.sendMail(message)
        let url = await nodemailer.getTestMessageUrl(sendEmail);
        return url;
    } catch(err){
        throw err;
    }

}