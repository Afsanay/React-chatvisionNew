import * as React from 'react';
import {Route,Routes} from 'react-router-dom'
import Stable from './stable';
import ChatBot from './chatbot';

export default function App() {
  return (
    <>
      <Routes>
          <Route path='/stable' element={<Stable/>} />
          <Route path='/' element={<ChatBot/>}/>
      </Routes>
    </>
  );
}


