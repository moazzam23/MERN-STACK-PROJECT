const nodemailer= require("nodemailer")


exports.sendemail = async (options)=>{

    const transporter= nodemailer.createTransport({ 
//         host: process.env.M_HOST,
//   port: process.env.M_PORT,
//   auth: {

//     user: process.env.M_EMAIL,
//     pass: process.env.M_PASSWORD,
//   },

//   service:process.env.M_SERVICE,
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "e705e6fd5a5893",
      pass: "567f7d6df640de"
    }      
})

  
    const mailoption=({
        from:"e705e6fd5a5893",
        to:options.email,
        subject:options.subject,
        text:options.message,
    })

    await transporter.sendMail(mailoption)
}