import React from 'react';
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AsiaCell from './components/AsiaCell';
import PosClass from './components/Pos';
import PosDetails from './components/PosDetails ';
import AgentDetails from './components/AgentDetails';
import EmpAgentDetails from './components/EmpAgentDetails';
import EmpCom from './components/EmpCom';
import Search from './components/Search';
import EmpComDetails from './components/EmpComDetails';
function App() {
  return (

    <div className='Apps'>

      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/:id-agent' exact element={<AsiaCell />} />
          <Route path='/:id-emp' exact element={<EmpCom />} />
          <Route path='/:id-emp/:id-empD' exact element={<EmpComDetails />} />
          <Route path='/:id/:id'  element={<AgentDetails />} />
          <Route path='/:id/:id/:id'  element={<EmpAgentDetails />} />
          <Route path='/pos' element={<PosClass />} />
          <Route path='/pos/:id' element={<PosDetails/>}/>
          <Route path='/search' element={<Search/>}/>
          <Route path='/search/:id-empcom' element={<EmpComDetails/>}/>
          <Route path='/search/:id-empagent' element={<EmpAgentDetails/>}/>
          <Route path='/search/:id-posdetails' element={<PosDetails/>}/>
        </Routes>
      </BrowserRouter>


 
    </div>


  );
}

export default App;
