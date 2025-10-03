import React from "react";
import './App.css'
import { DailyCreature } from './DailyCreature';
import { HashRouter as Router, Routes, Route, Link} from "react-router-dom"
import { titleTextStyleBold } from './styles';

export default function App() {
    
    return <div className='Background'><div className='App'>
      <Router style={{overflowY: 'hidden'}}>
        {<div style={{
          backgroundColor: 'grey',
          boxShadow: '0px 0px 15px #444444',
        }}>
          <Link to={"/"} style={{...titleTextStyleBold, fontSize: 25, marginLeft: '20vw', marginRight: '2vw'}}>Bestiary</Link>
          <Link to={"/region"} style={{...titleTextStyleBold, fontSize: 25, marginLeft: '2vw', marginRight: '20vw'}}>World</Link>
        </div>}
        <Routes>
          <Route path="/" element={<DailyCreature />} />
          <Route path="*" element={<h1 style={{...titleTextStyleBold, color: 'white', alignSelf: 'center'}}> {'<⬜⬜⬜⬜⬜>   '}  coming soon. </h1>} />
        </Routes>
      </Router>
      </div>
      
    </div>
  
}
