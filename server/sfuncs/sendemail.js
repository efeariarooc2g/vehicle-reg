
import nodemailer from 'nodemailer';


let email = (mailOptions) => {
    let courier = new Promise(function(resolve, reject){
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'naijaphilia@gmail.com',
                pass: 'yourpass'
            }
        });

            // setup email data with unicode symbols
        if(!mailOptions){
            mailOptions = {
                from: '"Uche C 👻" <naijaphilia@gmail.com>', // sender address
                to: 'ucchikezie@yahoo.com', // list of receivers
                subject: 'Hello ✔', // Subject line
                text: 'Hello world ?', // plain text body
                html: '<b>Hello world ?</b>' // html body
            };
        }

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                reject(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
            resolve(info);
        });
    });
}        


export default email;
