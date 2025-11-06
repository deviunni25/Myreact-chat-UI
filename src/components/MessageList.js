// MessageList.js
import React, { useRef, useEffect } from "react";
import userAvatar from "../assets/user.png";
import botAvatar from "../assets/bot.png";
import "../App.css";

// Props:
// messages - array of all messages
// onDelete - function to delete a message by ID
function MessageList({ messages, onDelete }) {
  return (
    <div className="message-list">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`message ${msg.sender === "You" ? "user-message" : "bot-message"}`}
        >
          <img
            src={msg.sender === "You" ? userAvatar : botAvatar}
            alt={`${msg.sender} avatar`}
            className="avatar"
          />

          <div className="message-header">
            <span className="sender">{msg.sender}</span>
            {msg.time && <span className="timestamp">{msg.time}</span>}
          </div>
          <div className="message-text">{msg.text}</div>
          <button
            className="delete-btn"
            onClick={() => {
              onDelete(msg.id); // delete message in App.js
              // Also update localStorage immediately
              const updatedMessages = messages.filter((m) => m.id !== msg.id);
              localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
            }}
          >
            🗑️
          </button>
        </div>
      ))}
    </div>
  );
}

export default MessageList;
