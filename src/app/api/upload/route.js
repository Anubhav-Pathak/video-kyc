import { NextResponse } from 'next/server';
import {uploadFile} from '@/utils/s3Bucket';

export const POST = async (req) => {
    try{
        const data = await req.formData();
        const profile = data.get('image');
        const name = data.get('name');
        const dob = data.get('dob');
        const type = data.get('type');
        const s3Image = await uploadFile('profiles', `${name}_${dob}-${type}`, profile);
        let url = s3Image.Location;
        return NextResponse.json({message: url}, {status: 200});
    } catch(error){
        console.log(error);
        return NextResponse.json({message: "Error creating user"}, {status: 500});
    } finally {
    }
}