import { NextResponse } from 'next/server';
import {uploadFile} from '@/utils/s3Bucket';

export const POST = async (req) => {
    try{
        const data = await req.formData();
        const profile = data.get('image');
        const s3Image = await uploadFile('profiles', `${new Date().toISOString()}`, profile);
        let url = s3Image.Location;
        return NextResponse.json({message: "Voter created successfully"}, {status: 200});
    } catch(error){
        console.log(error);
        return NextResponse.json({message: "Error creating user"}, {status: 500});
    } finally {
    }
}