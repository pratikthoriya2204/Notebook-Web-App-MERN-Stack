import './App.css';
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import Navbar from './component/Navbar';
import Home from './component/Home';
import About from './component/About';
import NoteState from './context/notes/noteState';
import Alert from './component/Alert';
import Login from './component/Login';
import Signup from './component/Signup';
import { useState } from 'react';

function App() {
  const [alert,setAlert] = useState(null);

  const showALert = (message,type)=>{
    setAlert({
      msg:  message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  return (
    <>
      <NoteState>
        <Router>
          <Navbar showALert={showALert} />
          <Alert alert={alert}/>
          <div className="container">
            <Switch>
              <Route exact path='/' element={<Home showALert={showALert}/>} />
              <Route exact path='/about' element={<About />} />
              <Route exact path='/login' element={<Login showALert={showALert}/>}  />
              <Route exact path='/signup' element={<Signup showALert={showALert}/>} />
            </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
