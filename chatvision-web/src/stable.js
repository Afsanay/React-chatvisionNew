import { useState } from "react";
import Navbar from './navbar';

export default function Stable(){
    
    const [urls,setUrl] = useState([]);
    const [prompt,setPrompt] = useState("");

    const { Configuration, OpenAIApi } = require("openai");
    const configuration = new Configuration({
      apiKey: "APIKEY",

    });

    const handleKeyDown = (e) => {
      if(e.key === "Enter" && !e.shiftKey){
        e.preventDefault();
        sendPrompt();
      }
    };
  

    const sendPrompt = async () =>{
        const openai = new OpenAIApi(configuration);
        const currPrompt = prompt;
        setPrompt('');
        try{
          const response = await openai.createImage({
            prompt: currPrompt,
            n: 4,
            size: "1024x1024",
          });
          const image_urls = [
            {
              idx:0,
              url:response.data.data[0].url,
            },
            {
              idx:1,
              url:response.data.data[1].url,
            },
            {
              idx:2,
              url:response.data.data[2].url,
            },
            {
              idx:3,
              url:response.data.data[3].url,
            },
          ];
          setUrl(image_urls);
          
      }
      catch(error){
        console.log(error);
      }
    }
    return (
        <>
        <div className="flex flex-col h-screen bg-gray-800">
        <Navbar/>
        <div className=" pl-40 pr-6 py-4">
            <h1 className=" text-4xl font-extrabold mb-4 leading-none tracking-tight text-gray-300 md:text-5xl lg:text-6xl">Text-to-Image Generation</h1>
            <p className="text-gray-200 text-center gap-1 leading-loose">Text to Image AI tools are revolutionary advancements in the field of artificial intelligence that seamlessly bridge the gap between words and visuals. These remarkable tools utilize deep learning techniques to generate high-quality, realistic images based on textual descriptions.</p>
        </div>
        <div className="h-screen grid grid-cols-4 gap-4  pl-40 pr-6 py-4">
          {urls.map(data =>(
            <img src={data.url} alt="Nothin"/>
          ))}
        </div>
          <div className=" mx-auto w-full max-w-screen-md mx-200 px-10 pt-0 pb-5 flex sticky bottom-0 ">
            <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} onKeyDown={handleKeyDown} className="border rounded-md text-lg p-2 flex-1" rows={1} placeholder="Type your query" />
            <button onClick={sendPrompt} className="border rounded-md bg-blue-600 hover:bg-blue-700 text-white px-4 ml-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-6 w-6 transform rotate-90">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                  </svg></button>
          </div>
        </div>
        </>
    );
}