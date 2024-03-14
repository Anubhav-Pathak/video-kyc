"use client";

import ChatStart from './ui/ChatStart'
import ChatEnd from './ui/ChatEnd'

import useChatStore from '@/store/ChatStore';
import { useEffect } from 'react';
import usePipelineStore from '@/store/PipelineStore';

const Chat = () => {

const {messages, addMessage} = useChatStore();
  const question = usePipelineStore(state => state.question);

  useEffect(() => {
    if (question) {
      addMessage({text: question, type: 'start'});
    }
  }, [question, addMessage])

  return (
    <div className='p-2 overflow-y-scroll mb-4'>
      {
        messages.map((message, index) => {
          if (message.type === 'start') {
            return <ChatStart key={index} message={message.text} />
          } else if (message.type === 'end') {
            return <ChatEnd key={index} message={message.text} />
          }
        })
      }
    </div>
  )
}

export default Chat;