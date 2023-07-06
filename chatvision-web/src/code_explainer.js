import { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Navbar from "./navbar";

const SYSTEM_MESSAGE = "You are a virtual assistant, named ChatVision made by Priyanshu Sobti, that explains the functionality of some given code in simple words. Start with a short overview of the code, followed by a detailed explanation using bullet points, followed by a list of errors (if any)."
export default function Code() {
    const [history,setHistory] = useState([{role:"system",content:SYSTEM_MESSAGE}]);
    const [language,setLanguage] = useState("");
    const [code,setCode] = useState("");
    const [userAns,setUserAns] = useState("");

    const { Configuration, OpenAIApi } = require("openai");
  const configuration = new Configuration({
    apiKey: "APIKEY",

  });


    const sendPrompt = async () =>{
        if(!language){
            alert("Provide a topic.");
            return;
        }
        if(!code){
          alert("Please provide the code.");
          return;
        }
        const message = `ChatVision, the language provided is ${language} and the code given is ${code}. Can you please explain it`

        const updatedMessages = [
          ...history,
          {
            role: "system",
            content: message,
          },
          {
            role:"user",
            content: "Please explain the code."
          },
        ];

        setHistory(updatedMessages)
        const openai = new OpenAIApi(configuration);
        try{
            const completion = await openai.createChatCompletion({
              model: "gpt-3.5-turbo",
              messages: updatedMessages,
            });
            const botMessage = completion.data.choices[0].message;
            const updatedMessages2 = [
              ...updatedMessages,
              botMessage
            ];
            setHistory(updatedMessages2);
        }
        catch(error){
          console.log(error);
        }
    }

    const sendRequest = async () => {
        if(!userAns){
            alert("Please Give an Answer");
            return;
        }
        const updatedMessages = [
            ...history,
            {
              role: "user",
              content: userAns,
            },
          ];
        setHistory(updatedMessages);
        setUserAns("");
        const openai = new OpenAIApi(configuration);
        try{
            const completion = await openai.createChatCompletion({
              model: "gpt-3.5-turbo",
              messages: updatedMessages,
            });
            const botMessage = completion.data.choices[0].message;
            const updatedMessages2 = [
              ...updatedMessages,
              botMessage
            ];
            setHistory(updatedMessages2);
        }
        catch(error){
          console.log(error);
        }
    }

    const handleKeyDown = (e) => {
      if(e.key === "Enter" && !e.shiftKey){
        e.preventDefault();
        sendRequest();
      }
    };
  

    return (
        <>
    <div className="flex flex-col h-screen bg-gray-800 overflow-y-hidden">
            <Navbar/>
        {history.length <= 1 && 
            <div className=" pl-40 pr-6 py-4">
            <h1 className=" text-4xl font-extrabold mb-4 leading-none tracking-tight text-gray-300 md:text-5xl lg:text-6xl">Code Explainer</h1>
            <p className="text-gray-200 text-center gap-1 leading-loose">Breaks down any piece of code and provides a clear explanation of the code helping you understand programming concepts and improve your coding skills.</p>

            <div className="mx-auto w-full max-w-screen-md mx-200 px-10 pt-0 pb-5 flex sticky bottom-0">
                <textarea className="border w-fit rounded-md text-lg p-2 flex-1 bg-gray-300 text-gray-600" placeholder="Language" rows={1} onChange={(e) => setLanguage(e.target.value)}/>
                <button className="border rounded-md bg-blue-600 hover:bg-blue-700 text-white px-4 ml-2" onClick={sendPrompt}>Explain Code</button>
            </div>
            <textarea className="border w-4/6 rounded-md ml-60 text-lg flex-1 bg-gray-300 text-gray-600" placeholder="Code" rows={12} onChange={(e) => setCode(e.target.value)}/>
        </div>
        }
        {history.length > 1 && 
        <>
            <div className="flex flex-col flex-1 overflow-y-scroll pb-100 overflow-x-hidden w-full h-full mx-auto pl-40 pr-6 py-4">
                      {history
                      .filter((message) =>message.role !== "system")
                      .map((message,idx) => (
                        <div key = {idx} className="my-3">
                                
                        {message.role !== "user" && <div>
                        <div class="chat-message">
                <div class="flex items-end">
                    <div class="flex flex-col space-y-2 text-xs mx-2 order-2 items-start">
                      <div><span class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600 prose"><ReactMarkdown>{message.content}</ReactMarkdown></span></div>
                    </div>
                    <img src={require('./images/newim.png')} alt="My profile" class="w-12 h-12 rounded-full order-1"/>                </div>
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
            <div className="  mx-auto w-full max-w-screen-md mx-200 px-10 pt-1 pb-5 flex sticky bottom-0">    
              <textarea value={userAns} onChange={(e) => setUserAns(e.target.value)} onKeyDown={handleKeyDown} className="border rounded-md text-lg p-2 flex-1" rows={1}placeholder="Type your query" />
                <button onClick={sendRequest} className="border rounded-md bg-blue-600 hover:bg-blue-700 text-white px-4 ml-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-6 w-6 transform rotate-90">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
               </svg></button>
              </div>
            </>
        }
    </div>
    </>
    );
}