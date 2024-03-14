/* 
    This file is used to create a pipeline of functions that will be executed in a sequence.
    
    Computer Prompt ---> User Prompt ----> User Prompt Display ----> User Prompt Verfication ---> User Prompt Save;

*/
import EasySpeech from 'easy-speech';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI("AIzaSyASwwj3dmMjzio_QH87O0bMRvFtT1x8ubY");

export async function Ask(text, lang){
    try{
        await EasySpeech.init();
        await EasySpeech.speak({text: text, lang: lang});
    } catch (error){
        console.log(error);
    }
}

export const Listen = (lang) => {
    return new Promise((resolve, reject) => {
        let transcript;
        const recognition = new webkitSpeechRecognition();
        recognition.lang = lang;
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.start();
        recognition.onstart = () => {
            setTimeout(() => {
                recognition.stop();
            }, 10000);
        };
        recognition.onend = () => {
            resolve(transcript);
        };
        recognition.onresult = (event) => {
            transcript = event.results[0][0].transcript.toLowerCase();
        }
        recognition.onerror = (error) => {
            console.error('Speech recognition error:', error);
            reject(error);
        }
    })
}

export const TexttoText = async (prompt, data) => {
    const generationConfig = {
        maxOutputTokens: 50,
    };
  const model = genAI.getGenerativeModel({ model: "gemini-pro"}, generationConfig );
  const result = await model.generateContent([prompt, data]);
  const response = result.response;
  return response.text();
}

export async function ImageToText(prompt, image) {
    const generationConfig = {
        maxOutputTokens: 50,
    };
      
    function fileToGenerativePart(image, mimeType='image/png') {
        return {
            inlineData: {
                data: image.split(',')[1],
                mimeType,
            },
        };
    }
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" }, generationConfig);
    const imageParts = [fileToGenerativePart(image)];
    const result = await model.generateContent([prompt, ...imageParts]);
    const response = result.response;
    return response.text();
}