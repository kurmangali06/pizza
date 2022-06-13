import { Route, Routes } from 'react-router-dom';

import MainLaoyout from './layouts/MainLaoyout';
import Cart from './pages/Cart';
import FullPizza from './pages/FullPizza';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

import './scss/App.scss';



function App() {



  return (

    <Routes>
      <Route path='/' element={<MainLaoyout />}>
        <Route path='' element={<Home />} />
        <Route path='cart' element={<Cart />} />
        <Route path='pizza/:id' element={<FullPizza />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>

  );
}

export default App;
