import { useState } from "react";
import Navbar from './navbar';

export default function Stable(){
    
    const [urls,setUrl] = useState([]);
    const [prompt,setPrompt] = useState("");

    const { Configuration, OpenAIApi } = require("openai");
    const configuration = new Configuration({
        apiKey: "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",
    });
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
        <Navbar/>
        <div className="h-screen grid grid-cols-4 gap-4">
          {urls.map(data =>(
            <img src={data.url} alt="Nothin"/>
          ))}
        </div>
        <div className=" mx-auto w-full max-w-screen-md px-4 pt-0 pb-2 flex sticky bottom-0">
          <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} className="border rounded-md text-lg p-2 flex-1" rows={1}placeholder="Type your query" />
          <button onClick={sendPrompt} className="border rounded-md bg-blue-500 hover:bg-blue-600 text-white px-4 ml-2">Click</button>
        </div>
        </>
    );
}