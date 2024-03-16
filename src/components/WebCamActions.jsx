import Image from 'next/image'

import useUserStore from '@/store/UserStore'
import useLoadingStore from '@/store/LoadingStore'
import { Listen } from '@/utils/pipeline.mjs';
import useChatStore from '@/store/ChatStore';
import usePipelineStore from '@/store/PipelineStore';

import { TexttoText } from '@/utils/pipeline.mjs';
import useDataStore from '@/store/DataStore';

const WebCamActions = () => {

    const {preference, changePreference} = useUserStore();
    const {question, prompt, type, index, setIndex} = usePipelineStore();
    const {data, setData} = useDataStore();
    const addMessage = useChatStore(state => state.addMessage);
    const {loadingStates, setLoadingState } = useLoadingStore();

    const listenPipeline = async() => {
        const answer = await Listen(preference.lang)
        const modified_answer = await TexttoText(prompt, answer);
        await setData(type, modified_answer);
        await addMessage({text: answer, type: 'end'});
        await setLoadingState('user-prompt', false);
        await setIndex(index + 1);
    }

    const clickHandler = async () => {
        await changePreference({...preference, audio: !preference.audio})
        if(!preference.audio && loadingStates['user-prompt']){
            listenPipeline();
        }
    }

  return (
    <div className='flex absolute bottom-2 left-1/2 -translate-x-1/2 gap-2'>
        <button className='btn btn-primary btn-circle btn-error'>
            <Image src={"/video-camera.png"} alt="image" width="30" height="30"/>
        </button>

        {preference.audio && loadingStates['user-prompt'] ? 
            <button className='btn btn-primary btn-circle btn-success z-10' onClick={clickHandler}>
                <Image src={"/microphone.png"} alt="image" width="30" height="30"/>
            </button> :
            <button className='btn btn-primary btn-circle btn-error' onClick={clickHandler}>
                <Image src={"/microphone.png"} alt="image" width="30" height="30"/>
            </button>
        }

    </div>
  )
}

export default WebCamActions