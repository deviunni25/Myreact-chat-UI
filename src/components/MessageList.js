import React, { useRef, useEffect } from "react";
import userAvatar from "../assets/user.png";
import botAvatar from "../assets/bot.png";
import "../App.css"; 

function MessageList({ messages }) {
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

    return (
    <div className="message-list">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`message-item ${
            msg.sender === "You" ? "user-message" : "bot-message"
          }`}
        >
          {/* Display avatar depending on sender */}
          <img
            src={msg.sender === "You" ? userAvatar : botAvatar}
            alt={`${msg.sender} avatar`}
            className="avatar"
          />

          {/* Message text bubble */}
          <div className="message-text">{msg.text}
            <div className="message-time">{msg.time}</div>
          </div>
        </div>
      ))}

      {/* Invisible element for scroll anchoring */}
      <div ref={messagesEndRef} />
    </div>
  );
}
export default MessageList;
