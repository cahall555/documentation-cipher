import { io } from "https://cdn.skypack.dev/socket.io-client";

const sio = io({ autoConnect: false });

document.getElementById("question-btn").addEventListener("click", () => {
  console.log("button clicked");
  const question = document.getElementById("question-text").value;
  console.log(question);

  sio.connect();
  console.log("client connected");

  sio.on("connect", () => {
    sio.emit("handle_query", question);
  });

  sio.on("answer", (answer) => {
    console.log(answer["answer"]);
    document.getElementById("output").innerHTML = answer["answer"];
  });
});

sio.on("disconnect", () => {
  console.log("Client disconnected");
});
