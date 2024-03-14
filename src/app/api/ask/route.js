import {NextResponse} from 'next/server';
import data from "@/data.json";
const {questions} = data;

export const GET = async (req) => {
    const url = new URL(req.url);
    const query = new URLSearchParams(url.search);
    const index = query.get('index');
    try{
        return NextResponse.json({message: questions[index].question, prompt: questions[index].prompt ?? ""}, {status: 200});
    } catch (error){
        console.log(error);
        return NextResponse.json({error}, {status: 500});
    }
}