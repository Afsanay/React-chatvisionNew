import * as React from 'react';
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Navbar from './navbar';
import {Link} from 'react-router-dom'

const SYSTEM_MESSAGE = "You are ChatVision, an Artificial Intelligence ChatBot created by Priyanshu Sobti. You are one of the most intelligent chatbots out there and you are created using state of the art Machine Learning Models and APIs. You are helpful and savage with your answers at the same time. Give savage replies whenever you want. Generate a proper introduction for yourself everytime you are asked for.";


export default function ChatBot() {
  
  const [userMessage,setUserMessage] = React.useState("");
  const [messages,setMessages] = React.useState([{role:"system",content:SYSTEM_MESSAGE}]);

  const { Configuration, OpenAIApi } = require("openai");
  const configuration = new Configuration({
    apiKey: "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",
  });

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
    const openai = new OpenAIApi(configuration);
    try{
        const completion = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: updatedMessages,
        });
        console.log(completion.data.choices[0].message);
        const botMessage = completion.data.choices[0].message;
        const updatedMessages2 = [
          ...updatedMessages,
          botMessage
        ];
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


          <div className="h-200">
            <Link to="/quiz_master" className="block max-w-md p-6 bg-gray-100 border border-gray-200 rounded-lg shadow hover:bg-gray-100">
              <img src="https://i.imgur.com/SYL3f0M.png" className="h-10 w-10"/>
              <text className="font-bold text-xl underline break-after">{"Quiz Master \n"}</text>
              <text>Practice your knowledge and understanding of any topic by dynamic AI-generated multiple choice questions with detailed explanations.</text>
              </Link>
          </div>


          <div className="h-200">
          <Link to="/mock_interview" className="block max-w-md p-6 bg-gray-100 border border-gray-200 rounded-lg shadow hover:bg-gray-100">
              <img src="https://i.imgur.com/CRBxvAz.png" className="h-10 w-10"/>
              <text className="font-bold text-xl underline break-after">{"Mock Interview \n"}</text>
              <text>Simulate an interview for any job position, providing personalized feedback and helping you prepare for your real interview.</text>
          </Link>
          </div>


          <div className="h-200">
          <Link to="/code_explainer" className="block  max-w-md p-6 bg-gray-100 border border-gray-200 rounded-lg shadow hover:bg-gray-100">
              <img src="https://i.imgur.com/gznl8L8.png" className="h-10 w-10"/>
              <text className="font-bold text-xl underline break-after">{"Code Explainer\n"}</text>
              <text>Breaks down any piece of code and provides a clear explanation of the code helping you understand programming concepts and improve your coding skills.</text>
          </Link>
          </div>

        </div>
        
    </div>
    </>
  );
}


