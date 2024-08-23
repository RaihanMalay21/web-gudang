import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './source/home';
import { PageRows } from './source/row';
import { Blocks } from './source/blocks';
import { Barang } from './source/barang';

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/warehouse" element={<Home/>}/>
            <Route path='/warehouse/rows' element={<PageRows/>}/>
            <Route path='/warehouse/rows/blocks' element={<Blocks/>}/>
            <Route path='/warehouse/rows/blocks/barangs' element={<Barang/>}/>
        </Routes>
    </Router>
  );
}

export default App;
