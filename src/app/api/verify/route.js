import { NextResponse } from 'next/server';
import * as faceapi from 'face-api.js';

export const POST = async (req) => {
    await faceapi.nets.ssdMobilenetv1.loadFromUri('/weights');
    await faceapi.nets.tinyFaceDetector.loadFromUri('/weights');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/weights');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/weights');
    await faceapi.nets.faceExpressionNet.loadFromUri('/weights');
    try{
        const {profile, aadhar} = await req.json();

        const profile_image = await fetch(profile).then((response) => response.blob());
        const aadhar_image = await fetch(aadhar).then((response) => response.blob());

        const idCardFacedetection = await faceapi.detectSingleFace(profile_image,new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();
        const selfieFacedetection = await faceapi.detectSingleFace(aadhar_image, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();
        if(idCardFacedetection && selfieFacedetection){
            const distance = faceapi.euclideanDistance(idCardFacedetection.descriptor, selfieFacedetection.descriptor);
            console.log(distance);
        }
        if(distance < 0.6){
            return NextResponse.json({message: "Face matched"}, {status: 200});
        }
        else{
            return NextResponse.json({message: "Face not matched"}, {status: 400});
        }
    } catch(error){
        console.log(error);
        return NextResponse.json({message: "Error creating user"}, {status: 500});
    } finally {
    }
}