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

const webSocketConnector = new WebSocketConnector();

function App() {
  const [nickname, setNickname] = useState(
    window.localStorage.getItem("nickname") || ""
  );

  const [clients, setClients] = useState<Client[]>([]);

  const [targetNickname, setTargetNickname] = useState("");

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
    ws.send(JSON.stringify({
      action: "getClients",
    }))
  };

  ws.onmessage = (e) => {
    const message = JSON.parse(e.data) as {
      type: string
      value: {
        clients : Client[]
      }
    }
    /* console.log(message.value); */
    setClients(message.value.clients);
  }

  return(
    <div className="flex">
      <div className="flex-none w-16 md:w-40 border-r-2">
        <Sidebar clients={clients} setTargetNickName={setTargetNickname}/>
      </div>
      <div className="flex-auto">
        <Chat/>
      </div>
    </div>
  );
  
}

export default App;
