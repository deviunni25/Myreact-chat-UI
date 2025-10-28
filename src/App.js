// root component is app.js - everything starts here
// renders the child components (chatwindow, messageinput, messagelist)
// importing the react to use JSX and CSS styles
import React, { useState, useRef, useEffect } from "react";
import "./App.css";

// Defining the app component(main component)
function App() {
  const [messages, setMessages] = useState([
    { id: 1, sender: "Bot", text: "Hey there 👋 How are you today?" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  // Auto-scroll to the bottom when a new message appears
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
  if (!inputValue.trim()) return;

  const newMessage = {
    id: Date.now(),
    sender: "You",
    text: inputValue.trim(),
  };

  setMessages((prev) => [...prev, newMessage]);
  setInputValue("");

  try {
    // Send message to backend
    const response = await fetch("http://localhost:5000/api/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: inputValue }),
    });

    const data = await response.json();

    // Add bot reply from backend
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: "Bot", text: data.reply },
    ]);
  } catch (error) {
    console.error("Error:", error);
  }
};


  // Allows the user to press the Enter key to send the message instead of clicking the button
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  // returning the JSX UI (displays on screen)
  return (
    // outer wrapper of the entire chat interface
    // header - simple Chat
    // container to hold whole message - chat-window
    // loops through meassage array and renders each message
    // Each message gets: unique key (required in lists) and a class name depending on whether it’s from the user or bot (for styling)
    // displays sender name and the message
    // Renders the message list and an empty div at the bottom — the scroll target for useRefnpm 
    <div className="chat-container">
      <div className="chat-header">💬 Simple Chat</div> 
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
        <div ref={messagesEndRef} />
      </div>

      <div className="input-area">
        <input
          type="text"
          placeholder="Type a message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
// The input box lets users type messages; 
// onChange updates the input state; 
// onKeyDown sends on Enter; and the button calls handleSend() when clicked.
export default App; // Makes this component available to index.js (the true entry point)