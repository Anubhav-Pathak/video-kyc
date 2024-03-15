import { NextResponse } from 'next/server';

import User from '@/models/User.mjs';
import connectDB from '@/utils/connectDB.mjs';

export const POST = async (req) => {
    try{
        await connectDB();
        const data = await req.json();
        const user = new User(data);
        await user.save();
        return NextResponse.json({message: "Voter created successfully"}, {status: 200});
    } catch(error){
        console.log(error);
        return NextResponse.json({message: "Error creating user"}, {status: 500});
    } finally {
    }
}