import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Welcome from "./Welcome";
import WebSocketConnector from "./WebSocketConnector";
import Chat from "./Chat";
import Sidebar from "./Sidebar";

export type Client = {
  connectionId: string;
  nickname: string;
};

export type Message = {
  messageId: string;
  createdAt: number;
  nicknameToNickname: string;
  message: string;
  sender: string;
};

const webSocketConnector = new WebSocketConnector();

function App() {
  const [nickname, setNickname] = useState(
    window.localStorage.getItem("nickname") || ""
  );

  const [clients, setClients] = useState<Client[]>([]);

  const [targetNicknameV, setTargetNicknameV] = useState("");

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    window.localStorage.setItem("nickname", nickname);
  });

  const webSocketConnectorRef = useRef(webSocketConnector);

  if (nickname === "") {
    return <Welcome setNickname={setNickname} />;
  }

  const url = `wss://8cz8tteyf9.execute-api.us-east-1.amazonaws.com/dev?nickname=${nickname}`;

  const ws = webSocketConnectorRef.current.getConnection(url);

  ws.onopen = () => {
    ws.send(
      JSON.stringify({
        action: "getClients",
      })
    );
  };

  //handles all messages received from websocketserver
  ws.onmessage = (e) => {
    const message = JSON.parse(e.data) as {
      type: string;
      value: unknown;
    };
    /* console.log(message.value); */
    console.log(message);
    if (message.type === "clients") {
      setClients((message.value as { clients: Client[] }).clients);
    }

    if (message.type === "messages") {
      setMessages((message.value as { message: Message[] }).message);
    }
  };

  //maybe improve with pagination later
  const setTargetNickname = (nickname: string) => {
    setTargetNicknameV(nickname);
    ws.send(
      JSON.stringify({
        action: "getMessages",
        setTargetNickname: nickname,
        limit: 1000,
      })
    );
    setTargetNicknameV(nickname);
  };

  const sendMessage = (message: string) => {
    ws.send(
      JSON.stringify({
        action: "sendMessage",
        receiverNickname: targetNicknameV,
        message,
      })
    );
  };

  return (
    <div className="flex">
      <div className="flex-none w-16 md:w-40 border-r-2">
        <Sidebar clients={clients} setTargetNickname={setTargetNicknameV} />
      </div>
      <div className="flex-auto">
        <Chat messages={messages} sendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default App;
