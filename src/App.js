import GeraCarteirinhaIndividual from "./views/GeraCarteirinhaIndividual";
import GeraCarteirinhaEmLote from "./views/GeraCarteirinaEmLote";
import AdicionarCarteirinha from "./views/AdicionarCarteirinha";
import Menu from "./views/Menu";
import { Provider } from "./services/context";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Provider>
    <Router>
      <Routes>
        <Route path='/' element={<Menu/>}/>
        <Route path='/individual' element={<GeraCarteirinhaIndividual/>}/>
        <Route path='/emLote' element={<GeraCarteirinhaEmLote/>}/>
        <Route path='/Adicionar' element={<AdicionarCarteirinha/>}/>
      </Routes>
    </Router>
    </Provider>
  );
}

export default App;
