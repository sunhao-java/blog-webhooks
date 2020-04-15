var nodemailer = require('nodemailer');

function sendMail(result, out, error) {
    nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_SMTP_HOST,
            port: process.env.MAIL_SMTP_PORT,
            secure: 'true' == process.env.MAIL_SMTP_SSL, // true for 465, false for other ports
            auth: {
                user: process.env.MAIL_SMTP_USER, // generated ethereal user
                pass: process.env.MAIL_SMTP_PASSWORD // generated ethereal password
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Blog-Webhooks" ' + process.env.MAIL_SMTP_USER, // sender address
            to: 'sunhao0550@163.com', // list of receivers
            subject: 'Blog-Webhook执行情况', // Subject line
            html: '<b>最终执行结果:</b><br/>' + (result ? '执行成功' : '执行失败') + '<br/><br/><b>正常输出:</b><br/>' + out + "<br/><br/><b>异常信息:</b><br/>" + error
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
    });
}

exports.sendMail = sendMail