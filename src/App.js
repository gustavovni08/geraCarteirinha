import GeraCarteirinhaIndividual from "./views/GeraCarteirinhaIndividual";
import GeraCarteirinhaEmLote from "./views/GeraCarteirinaEmLote";
import Menu from "./views/Menu";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Menu/>}/>
        <Route path='/individual' element={<GeraCarteirinhaIndividual/>}/>
        <Route path='/emLote' element={<GeraCarteirinhaEmLote/>}/>
      </Routes>
    </Router>
  );
}

export default App;
