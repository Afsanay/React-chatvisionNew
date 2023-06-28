import * as React from 'react';
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Navbar from './navbar';
import {Link} from 'react-router-dom'

const API_URL = "https://api.pawan.krd/v1/chat/completions";
const SYSTEM_MESSAGE = "You are ChatVision, an Artificial Intelligence ChatBot created by Priyanshu Sobti. You are one of the most intelligent chatbots out there and you are created using state of the art Machine Learning Models and APIs. You are helpful and savage with your answers at the same time. Give savage replies whenever you want. Generate a proper introduction for yourself everytime you are asked for.";


export default function ChatBot() {
  
  const [userMessage,setUserMessage] = React.useState("");
  const [messages,setMessages] = React.useState([{role:"system",content:SYSTEM_MESSAGE}]);

  const sendReq = async () =>{
    const updatedMessages = [
      ...messages,
      {
        role: "user",
        content: userMessage,
      },
    ];
    setMessages(updatedMessages);
    setUserMessage("");
    try{
      const response = await fetch(API_URL,{
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
          "Authorization": `Bearer pk-jdLDAvPgJzeEupRRYbtCKEPnVzqjyXvDBrjAqVfTXDnkRrst`
        },
        body:JSON.stringify({
          model:"gpt-3.5-turbo",
          messages:updatedMessages,
        }),
      });
      console.log(response);
      const resJson = await response.json();
      console.log(resJson);
      const botMess = resJson.choices[0].message;
      const updatedMessages2 = [...updatedMessages,botMess];
      setMessages(updatedMessages2);
    }
    catch(error){
      console.log(error);
    }

  }

  return (
    <>
    <div className="flex flex-col h-screen">
        <Navbar/>
      <div className="flex flex-col h-screen">
        <div className="flex-1 overflow-y-scroll">
        <div className="w-full max-w-screen-md mx-auto p-4">
          {messages
          .filter((message) =>message.role !== "system")
          .map((message,idx) => (
            <div key = {idx} className="my-3">
              <div className="font-bold">{message.role === "user"?"You" : "ChatVision"}</div>
                <div className="text-lg prose">
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
        <div className=" mx-auto w-full max-w-screen-md px-4 pt-0 pb-2 flex sticky bottom-0">
          <textarea value={userMessage} onChange={(e) => setUserMessage(e.target.value)} className="border rounded-md text-lg p-2 flex-1" rows={1}placeholder="Type your query" />
          <button onClick={sendReq} className="border rounded-md bg-blue-500 hover:bg-blue-600 text-white px-4 ml-2">Click</button>
          <Link to="/stable">Stable</Link>
        </div>
        <div className="grid grid-cols-3 p-4">


<div className="h-2