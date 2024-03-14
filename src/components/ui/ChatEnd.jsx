import React from 'react'

const ChatEnd = ({message}) => {
  return (
    <div className="chat chat-end">
        <div className="chat-bubble">{message}</div>
    </div>
  )
}

export default ChatEnd