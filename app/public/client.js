import { io } from "https://cdn.skypack.dev/socket.io-client";

const sio = io({ autoConnect: false });

// Connection listeners
sio.on("connect", () => {
    console.log("Client connected");
});

sio.on("disconnect", () => {
    console.log("Client disconnected");
});

// Question listener
sio.on("question", (question) => {
    if (question["question"].trim() !== "") {
        const ul = document.getElementById("chat-messages");  
        const UserChat = document.createElement("UserChat");  
        UserChat.innerText = question["question"];
        ul.appendChild(UserChat);
        ul.scrollTop = ul.scrollHeight;
    }
});

// Answer listener
sio.on("answer", (answer) => {
    console.log(answer["answer"]);
    document.getElementById("output").innerHTML = answer["answer"];
});

document.getElementById("question-btn").addEventListener("click", () => {
    console.log("Button clicked");
    const question = document.getElementById("question-text").value;
    document.getElementById("question-text").value = "";
    document.getElementById("output").innerHTML = "Loading...";
    console.log(question);

    // If socket is not connected, establish a connection
    if (!sio.connected) {
        sio.connect();
    }
    // Emit the question
    sio.emit("handle_query", question);
});

// Connect to the server when the page loads or at an appropriate time.
sio.connect();

