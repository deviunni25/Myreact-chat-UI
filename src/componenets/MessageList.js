import React, { useRef, useEffect } from "react";

function MessageList({ messages }) {
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-window">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`message ${msg.sender === "You" ? "user" : "bot"}`}
        >
          <span className="sender">{msg.sender}: </span>
          <span>{msg.text}</span>
        </div>
      ))}

      {/* Invisible anchor div for scrolling */}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessageList;
