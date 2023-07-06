import { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Navbar from "./navbar";

const SYSTEM_MESSAGE = `You are an assistant named ChatVision made by Priyanshu Sobti.Your job is to write emails that are more likely to be opened, read, and their CTAs more likely to be clicked on. You will be given a subject and a description or draft of the email, and you will rewrite it to maximize opens, reads, and clicks. Use a friendly tone and don't come across as too desperate or promotional. Use bullet points and highlight important words wherever possible.
                        Try to follow these guidelines for the subject:
                        - Use actionable language
                        - Personalize when possible
                        - Prioritize clarity, and only then think about "catchiness."
                        - Align your subject line copy and email copy
                        Try to follow these guideliens for the email body:
                        - Establish relevancy
                        - Write in the second person
                        - Talk about benefits, not features
                        - Be brief
                        - Be lovable
                        - Use actionable language in your call-to-action
                        After writing the email, ask the user for feedback and offer to modify the template as required.
`

export default function Email() {
    const [history,setHistory] = useState([{role:"system",content:SYSTEM_MESSAGE}]);
    const [Subject,setLanguage] = useState("");
    const [Description,setCode] = useState("");
    const [userAns,setUserAns] = useState("");

    const { Configuration, OpenAIApi } = require("openai");
  const configuration = new Configuration({
    apiKey: "APIKEY",

  });


    const sendPrompt = async () =>{
        if(!Subject){
            alert("Provide a Subject");
            return;
        }
        if(!Description){
          setCode("Easy");
          return;
        }
        const message = `ChatVision, The Subject is ${Subject} and the description is ${Description} Please write the email!`

        const updatedMessages = [
          ...history,
          {
            role: "user",
            content: message,
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
          alert("Please check your API key")
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
            <h1 className=" text-4xl font-extrabold mb-4 leading-none tracking-tight text-gray-300 md:text-5xl lg:text-6xl">Email Generator</h1>
            <p className="text-gray-200 text-center gap-1 leading-loose">Generate a personalized Email based on a given Description which can be further changed according to the user inputs</p>

            <div className="mx-auto w-full max-w-screen-md mx-200 px-10 pt-0 pb-5 flex sticky bottom-0">
                <textarea className="border w-fit rounded-md text-lg p-2 flex-1 bg-gray-300 text-gray-600" placeholder="Subject" rows={1} onChange={(e) => setLanguage(e.target.value)}/>
                <button className="border rounded-md bg-blue-600 hover:bg-blue-700 text-white px-4 ml-2" onClick={sendPrompt}>Generate Email</button>
            </div>
            <textarea className="border w-4/6 rounded-md ml-60 text-lg flex-1 bg-gray-300 text-gray-600" placeholder="Description" rows={12} onChange={(e) => setCode(e.target.value)}/>
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