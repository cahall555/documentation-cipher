import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const sio = io({ autoConnect: false });

const Chat = () => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [questionText, setQuestionText] = useState("");

  useEffect(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
    const handleQuestion = (question) => {
      if (question["question"].trim() !== "") {
        const newMessage = {
          author: "User",
          content: question["question"],
          style: "text-lightgreen bg-pink drop-shadow-md font-kalam p-8",
        };
        setMessages((currentMessages) => [...currentMessages, newMessage]);
      }
    };
    const handleAnswer = (answer) => {
      setLoading(false);
      const newMessage = {
        author: "Document Bot",
        content: answer["answer"],
        style: "text-gold font-kanit p-8",
      };
      setMessages((currentMessages) => [...currentMessages, newMessage]);
    };

    // Set up socket event listeners
    sio.on("connect", () => console.log("Client connected"));
    sio.on("disconnect", () => console.log("Client disconnected"));
    sio.on("question", handleQuestion);
    sio.on("answer", handleAnswer);

    // Connect the socket
    sio.connect();

    return () => {
      sio.off("question", handleQuestion);
      sio.off("answer", handleAnswer);
      sio.disconnect();
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = () => {
    console.log("Send button clicked");
    setLoading(true);
    sio.emit("handle_query", questionText);
    setQuestionText("");
  };
  useEffect(() => {
    window.clearChat = () => {
      setMessages([]);
      localStorage.removeItem("chatMessages");
    };
    return () => {
      delete window.clearChat;
    };
  }, []);

  return (
    <>
      <div className="flex flex-col w-full md:m-16 text-center items-center">
        <ul className="list-none h-fit w-full p-8 align-center text-left text-xl">
          {messages?.map((message, index) => (
            <li key={index} className={message.style}>
              <strong className="font-semibold text-2xl">
                {message.author}:{" "}
              </strong>
              {message.content}
            </li>
          ))}
        </ul>
      </div>
      {loading && (
        <div className="items-center text-center m-8 md:m-16 font-kanit text-darkgreen font-semibold text-3xl">
          <svg
            class="fill-darkgreen animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
          >
            {" "}
            <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"></path>
          </svg>{" "}
          Loading...
        </div>
      )}
      <div className="flex flex-col md:flex-row gap-2 p-4">
        <input
          className="bg-background drop-shadow-lg rounded-full w-full border-2 border-gold focus:outline-pink text-lightgreen font-kalam p-4 font-semibold text-xl"
          type="text"
          value={questionText}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              handleSendMessage();
            }
          }}
          onChange={(e) => setQuestionText(e.target.value)}
        />
        <button
          className="flex flex-row gap-2 bg-gold text-background text-xl p-6 drop-shadow-lg rounded-full place-content-center text-center align-middle font-kalam font-semibold rounded-full"
          onClick={handleSendMessage}
        >
          Send
          <svg
            className="fill-background"
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
          >
            {" "}
            <path d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376V479.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z"></path>
          </svg>
        </button>
      </div>
    </>
  );
};

export default Chat;
