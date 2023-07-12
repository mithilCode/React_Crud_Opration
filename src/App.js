import { BrowserRouter,Routes,Route } from "react-router-dom";
import Crud from './Crud/Crud';
import './App.scss';
import Test from "./Test";
function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/crud" element={<Crud/>}/>
          <Route path="/test" element={<Test/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
