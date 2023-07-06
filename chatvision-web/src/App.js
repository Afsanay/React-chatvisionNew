import * as React from 'react';
import {Route,Routes} from 'react-router-dom'
import Stable from './stable';
import ChatBot from './chatbot';
import Code from './code_explainer';
import Quiz from './quiz_master';
import Interview from './mock_interview';
import Signup from './signup';
import Login from './login';
import RequireUser from './requireuser';
import Email from './email_gen';
import Tutor from './tutor';
export default function App() {
  return (
    <>
      <Routes>
        <Route element={<RequireUser/>}>
          <Route path='/stable' element={<Stable/>} />
          <Route path='/' element={<ChatBot/>}/>
          <Route path='/code_explainer' element ={<Code />}/>
          <Route path='/quiz_master' element ={<Quiz />}/>
          <Route path='/mock_interview' element ={<Interview />}/>
          <Route path='/email_gen' element ={<Email />}/>
          <Route path='/tutor' element ={<Tutor />}/>
        </Route>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
      </Routes>
    </>
  );
}


