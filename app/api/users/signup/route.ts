import { connect } from "@/app/lib/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/app/helpers/mailer";

connect();

//Asynchronous POST request handler
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {username, email, password} = reqBody;

        //check if the user exists
        const user = await User.findOne({email});

        if(user){
            return NextResponse.json(
                {error: "User already exists"},
                {status: 400}//return 400 response if user exists
            );
        }

        //hash password with bcryptjs
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        //save user to database
        const savedUser = await newUser.save();
        await sendEmail({
            email, 
            emailType:"VERIFY",
            userId: savedUser._id
        });

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        });
    } catch (error:any) {
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        );
    }
}
