import { io } from "https://cdn.skypack.dev/socket.io-client";

const sio = io({ autoConnect: false });

// Connection listeners
sio.on("connect", () => {
  console.log("Client connected");
});

sio.on("disconnect", () => {
  console.log("Client disconnected");
});

function appendMessage(sender, message, containerId, styleClass) {
  if (message.trim() !== "") {
    const ul = document.getElementById(containerId);
    const li = document.createElement("li");

    li.className = styleClass; // Applying the style class
    li.innerHTML = `<strong class="font-semibold text-2xl">${sender}: </strong> ${message}`;
    ul.appendChild(li);
    ul.scrollTop = ul.scrollHeight;

    ul.classList.remove("hidden");
  }
}

// Question listener
sio.on("question", (question) => {
  if (question["question"].trim() !== "") {
    appendMessage(
      "User",
      question["question"],
      "chat-container",
      "text-lightgreen bg-pink drop-shadow-md font-kalam p-8",
    );
  }
});

// Answer listener
sio.on("answer", (answer) => {
  console.log(answer["answer"]);
  appendMessage(
    "Document Bot",
    answer["answer"],
    "chat-container",
    "text-gold font-kanit p-8",
  );
});

document.getElementById("question-btn").addEventListener("click", () => {
  console.log("Button clicked");
  const question = document.getElementById("question-text").value;
  document.getElementById("question-text").value = "";
  //   document.getElementById("output").innerHTML = "Loading..."; TODO: Find a place for loading, maybe create animation
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
