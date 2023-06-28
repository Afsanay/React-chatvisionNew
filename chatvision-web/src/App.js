import * as React from 'react';
import {Route,Routes} from 'react-router-dom'
import Stable from './stable';
import ChatBot from './chatbot';
import Code from './code_explainer';
import Quiz from './quiz_master';
import Interview from './mock_interview';

export default function App() {
  return (
    <>
      <Routes>
          <Route path='/stable' element={<Stable/>} />
          <Route path='/' element={<ChatBot/>}/>
          <Route path='/code_explainer' element ={<Code />}/>
          <Route path='/quiz_master' element ={<Quiz />}/>
          <Route path='/mock_interview' element ={<Interview />}/>
      </Routes>
    </>
  );
}


