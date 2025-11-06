import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";

function MessageInput({ value, onChange, onSend, onEnter }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Add emoji to message and close picker
  const handleEmojiClick = (emojiObject) => {
    const emoji = emojiObject.emoji;
    onChange({
      target: { value: value + emoji },
    });
    setShowEmojiPicker(false); // auto-close picker after selection
  };

  return (
    <div className="input-area">
      <button
        className="emoji-toggle-btn"
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
      >
        😊
      </button>

      {showEmojiPicker && (
        <div className="emoji-picker-container">
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            theme="light" // ensures better visibility
            searchDisabled={false}
            skinTonesDisabled={false}
            emojiStyle="apple" // clean, colorful emojis
            width={340}
            height={400}
            lazyLoadEmojis={true}
          />
        </div>
      )}

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