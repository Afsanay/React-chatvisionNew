import * as React from 'react';
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Navbar from './navbar';

const SYSTEM_MESSAGE = "You are ChatVision, an Artificial Intelligence ChatBot created by Priyanshu Sobti. You are one of the most intelligent chatbots out there and you are created using state of the art Machine Learning Models and APIs. You are helpful and savage with your answers at the same time. Give savage replies whenever you want. Generate a proper introduction for yourself everytime you are asked for.";


export default function ChatBot() {
  const [userMessage,setUserMessage] = React.useState("");
  const [messages,setMessages] = React.useState([]);
  const email = localStorage.getItem("user_email");

  React.useEffect(() => {
    const data = localStorage.getItem(email + "_data")
    if(data !== null){
      console.log(messages);
      setMessages(JSON.parse(data))
      console.log(messages);
    }
    else{
      setMessages([{role:"system",content:SYSTEM_MESSAGE}])
    }
  },[
  ])

  const { Configuration, OpenAIApi } = require("openai");
  const configuration = new Configuration({
    apiKey: "APIKEY",
  });

  const handleKeyDown = (e) => {
    if(e.key === "Enter" && !e.shiftKey){
      e.preventDefault();
      sendReq();
    }
  };


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
        localStorage.setItem(email + "_data",JSON.stringify(updatedMessages2));
    }
    catch(error){
      console.log(error);
    }

  }

  return (
    <>
    <div className="flex flex-col h-screen bg-gray-800 overflow-y-hidden">
      <Navbar/>
        <div className="flex flex-col flex-1 overflow-y-scroll pb-100 overflow-x-hidden w-full h-full mx-auto pl-40 pr-6 py-4">
          {messages
          .filter((message) =>message.role !== "system")
          .map((message,idx) => (
                    <div key = {idx} className="my-3">
                      
                        {message.role !== "user" && <div>
                        <div class="chat-message">
                <div class="flex items-end">
                    <div class="flex flex-col space-y-2 text-xs mx-2 order-2 items-start">
                      <div><span class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600 prose"><ReactMarkdown>{message.content}</ReactMarkdown></span></div>
                    </div>
                    <img src={require('./images/newim.png')} alt="My profile" class="w-12 h-12 rounded-full order-1"/>
                </div>
              </div>
                        
                      
                      </div>
                        }
                        {message.role === "user" && <div >
          <div class="chat-message">
                  <div class="flex items-end justify-end">
                      <div class="flex flex-col space-y-2 text-xs mx-2 order-1 items-end">
                        <div><span class="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white prose"><ReactMarkdown>{message.content}</ReactMarkdown></span></div>
                      </div>
                      <img src={require('./images/user.png')} alt="My profile" class="w-19 h-10 rounded-full order-2"/>
                  </div>
                </div>


                          </div>
                        }
                          </div>
                      ))}
          </div>
      
      <div className=" mx-auto w-full max-w-screen-md mx-200 px-10 pt-1 pb-5 flex sticky bottom-0 ">
          <textarea value={userMessage} onChange={(e) => setUserMessage(e.target.value)} onKeyDown={handleKeyDown} className="border rounded-md text-lg p-2 flex-1" rows={1}placeholder="Type your query" />
          <button onClick={sendReq} className="border rounded-md bg-blue-600 hover:bg-blue-700 text-white px-4 ml-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-6 w-6 transform rotate-90">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
               </svg></button>
          <button onClick={()=>{
            localStorage.removeItem(email + "_data");
            setMessages([{role:"system",content:SYSTEM_MESSAGE}]);
          }} className="border rounded-md bg-blue-600 hover:bg-blue-700 text-white px-4 ml-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className='h-6'>
            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
          </svg></button>

        </div>
    </div>
    </>
  );
}