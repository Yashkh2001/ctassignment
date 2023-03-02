import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Librarypage from './components/librarypage.tsx';

function App() {
  return (
    <div className="App">

   <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Librarypage/>}/>
      </Routes>
    
  </BrowserRouter>
      
    </div>
  );
}

export default App;
