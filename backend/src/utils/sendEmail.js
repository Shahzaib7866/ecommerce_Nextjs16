
import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    } 
})

const sendEmail = async (options) =>{
    const mailOptions = {
        from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_USER}>`,
        to : options.to,
        subject: options.subject,
        text: options.text
    }

    try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    return info;
    
} catch (error){
    console.error("email sending failed:", error.message);
    throw new Error("email could not be sent")
}

}

export default sendEmail;



