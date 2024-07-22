import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({email, emailType, userId}:any) => {
    try {
        
        //create hashed token based on user's ID
        const hashedToken = await bcryptjs.hash(userId.toString,10);

        //update the user token in the database with the generated token and expiry time
        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId,{
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000,
            },);
        }
        else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId,{
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            },);
        }

        //create a nodemailer transport
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "0e6e7116688c21",
              pass: "530dd68d9b2d13"
            }
        });

        //Compose email options
        const mailOptions = {
            from: '<your email id>',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.domain}/verifyemail?token=${hashedToken}">here</a>to ${emailType === "VERIFY" ? "Verify your email" : "Reset your password"}</p>`
        }

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
}

