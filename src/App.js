// root component is app.js - everything starts here
// renders the child components (chatwindow, messageinput, messagelist)
// importing the react to use JSX and CSS styles
import React, { useState, useEffect, useRef} from "react";
import "./App.css";
import MessageList from "./components/MessageList";
import MessageInput from "./components/MessageInput";

// Defining the app component(main component)
//state management
function App() {
  // Initialize messages from localStorage (lazy initializer) to avoid overwriting saved data
  const [messages, setMessages] = useState(() => {
    try {
      const raw = localStorage.getItem("chatMessages");
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.error("Error reading chatMessages from localStorage", e);
    }
    // fallback default message if no saved chat exists
    return [{ id: 1, sender: "Bot", text: "Hey there 👋 How are you today?", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }];
  });

  // Stores what user types in the input field
  const [inputValue, setInputValue] = useState("");

  //track whether the bot is currently "typing"
  const [isTyping, setIsTyping] = useState(false);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("chatMessages", JSON.stringify(messages));
    } catch (e) {
      console.error("Error writing chatMessages to localStorage", e);
    }
  }, [messages]);

  //to remove a message by ID, and pass it as a prop to MessageList
  const handleDeleteMessage = (id) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  // Allows the user to press the Enter key to send the message instead of clicking the button
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  // Function to handle sending messages
  const handleSend = async () => {
    // Use the App-controlled inputValue (MessageInput should be controlled by App)
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    const timeNow = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Create user message object
    const newMessage = {
      id: Date.now(),
      sender: "You",
      text: userMessage,
      time: timeNow, // add timestamp
    };

    // Add user's message to the message list
    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");

    // Simulate "Bot is typing..."
    setIsTyping(true);

    try {
      // Simulate typing delay before sending bot response
      setTimeout(async () => {
        const response = await fetch("http://localhost:5000/api/message", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userMessage }), // use stored userMessage
        });

        const data = await response.json();

        // Create bot message object
        const botMessage = {
          id: Date.now(),
          sender: "Bot",
          text: data.reply,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }), // fixed timestamp format
        };

        // Add bot's message to the message list
        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);
      }, 1000); // 1 second delay
    } catch (error) {
      console.error("Error:", error);
      setIsTyping(false);
    }
  };

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
      <div className="chat-header">WeChat</div>
      <div className="chat-window">
        {/* Display all messages */}
        <MessageList messages={messages} onDelete={handleDeleteMessage} />

        {/* Show typing indicator when bot is typing */}
        {isTyping && (
          <div className="typing-indicator">
            <span>🤖 Bot is typing...</span>
          </div>
        )}
          <div ref={chatEndRef} />

        {/* Message input box */}
        <MessageInput
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onSend={handleSend}
          onEnter={handleKeyDown}
        />
      </div>
    </div>
  );
}

// The input box lets users type messages; 
// onChange updates the input state; 
// onKeyDown sends on Enter; and the button calls handleSend() when clicked.
export default App; // Makes this component available to index.js (the true entry point).