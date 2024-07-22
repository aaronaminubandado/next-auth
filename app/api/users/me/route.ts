import { connect } from "@/app/lib/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDataFromToken } from "@/helper/getDataFromToken";

connect();

export async function GET(request:NextRequest) {
    try {
        //Extract user id from authentication token
        const userId = await getDataFromToken(request);

        //use user ID to find user in database without password
        const user = await User.findOne({_id: userId}).select("-password");

        return NextResponse.json({
            message: "User found",
            data: user
        });
    } catch (error: any) {
        return NextResponse.json(
            {error: error.message},
            {status: 400}
        );
    }
}