import React from 'react'
import useLoadingStore from '@/store/LoadingStore';

const ChatStart = ({message}) => {

  const { loadingStates } = useLoadingStore();

  return (
    <div className="chat chat-start">
      <div className="chat-bubble chat-bubble-primary">{loadingStates["bot-prompt"] ? <span className="loading loading-dots loading-xs"></span> : message}</div>
    </div>
  )
}

export default ChatStart