import React , {useState} from 'react'
import Login from './components/Login'
import { BrowserRouter,  Routes, Route } from 'react-router-dom'
import app from './credenciales'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Home from './components/Home';
import Auto from './components/Auto';
import Navbar from './navegacion/Navbar';

const auth = getAuth(app);

const App = () => {

  const [usuario, setUsuario] = useState(null)

  onAuthStateChanged(auth, (userFirebase) => { //si el usuario esta logeado
    if (userFirebase) { //si el usuario esta logeado
      setUsuario(userFirebase) //guarda el usuario en el estado
    } else {
      setUsuario(null) //si no esta logeado el usuario es null
    }
  });

  return (
    <div className=''>
      {
        usuario ? 
        <BrowserRouter>
            <Navbar correoUsuario={usuario.email}/>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auto" element={<Auto />} />
              </Routes>
        </BrowserRouter>
        :
        <Login/>
      }
    
    </div>
  )
}

export default App
