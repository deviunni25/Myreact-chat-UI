import React from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import "../App.css"; // for styles

function ChatWindow({ messages, inputValue, onInputChange, onSend, onEnter }) {
  return (
    <div className="chat-container">
      <div className="chat-header">WeChat</div>

      {/* Message list */}
      <MessageList messages={messages} />

      {/* Input area */}
      <MessageInput
        value={inputValue}
        onChange={onInputChange}
        onSend={onSend}
        onEnter={onEnter}
      />
    </div>
  );
}

export default ChatWindow;
