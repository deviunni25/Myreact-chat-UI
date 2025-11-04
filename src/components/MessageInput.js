import React from "react";

function MessageInput({ value, onChange, onSend, onEnter }) {
  return (
    <div className="input-area">
      <input
        type="text"
        placeholder="Type a message..."
        value={value}
        onChange={onChange}
        onKeyDown={onEnter}
      />
      <button onClick={onSend}>Send</button>
    </div>
  );
}

export default MessageInput;
