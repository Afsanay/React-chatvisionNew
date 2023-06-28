import { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Navbar from "./navbar";

const SYSTEM_MESSAGE = "You are an assistant that helps users test their understanding of a topic by asking them multiple choice questions. The topic and difficulty level will be given to you, and you should reply with a single multiple choice question. The user will then reply with the answer, which could be a single character indicating the selected option or the full answer. If the answer is incorrect, simply mention that the answer is incorrect, and ask the user to try again. Don't reveal the correct answer or provide any explanation before the user has answered the question correctly.If the answer is correct, let the user know the answer is correct, provide a brief explanation, and then ask a new multiple choice question related to the same topic and repeat the process. Never ask the same question twice. Adjust the questions' difficultly based on the provided difficulty level."
export default function Quiz() {
    const [history,setHistory] = useState([{role:"system",content:SYSTEM_MESSAGE}]);
    const [topic,setTopic] = useState("");
    const [difficultly,setDifficulty] = useState("");
    const [userAns,setUserAns] = useState("");

    const { Configuration, OpenAIApi } = require("openai");
  const configuration = new Configuration({
    apiKey: "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",
  });


    const sendPrompt = async () =>{
        if(!topic){
            alert("Provide a topic");
            return;
        }
        const message = `The language provided is ${topic} and the code given is ${difficultly}. Please start the interview`

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



    return (
        <>
    <div className="flex flex-col h-screen">
            <Navbar/>
        {history.length <= 1 && 
            <>
            <h1 className=" text-4xl font-extrabold mb-4 leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">Code Explainer</h1>
            <div className="mx-auto w-full max-w-screen-md px-4 pt-0 pb-2 flex">
                <textarea className="border w-fit rounded-md text-lg p-2 flex-1" placeholder="Language" rows={1} onChange={(e) => setTopic(e.target.value)}/>
                <textarea className="border w-fit rounded-md text-lg p-2 flex-1" placeholder="Code" onChange={(e) => setDifficulty(e.target.value)}/>
                <button className="border rounded-md bg-blue-500 hover:bg-blue-600 text-white px-4 ml-2" onClick={sendPrompt}>Explain Code</button>
            </div>
        </>
        }
        {history.length > 1 && 
        <>
        <div className="flex-1 overflow-y-scroll">
            <div className="w-full max-w-screen-md mx-auto px-4">
            {history
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
            <div className="mx-auto w-full max-w-screen-md px-4 pt-0 pb-2 flex">    
                <textarea className="border rounded-md text-lg p-2 flex-1" rows={1} value={userAns} placeholder="Type your query" onChange={(e) => setUserAns(e.target.value)} />
                <button className="border rounded-md bg-blue-500 hover:bg-blue-600 text-white px-4 ml-2" onClick={sendRequest}>Click</button>
            </div>
        </>
        }
    </div>
    </>
    );
}