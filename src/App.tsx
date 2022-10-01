import { Route, Routes } from 'react-router-dom';

import MainLaoyout from './layouts/MainLaoyout';
import Home from './pages/Home';
import './scss/App.scss';
import React, { Suspense } from 'react';

const Cart = React.lazy(() => import(/*webpackChunkName: 'Cart' */ './pages/Cart'));
const FullPizza = React.lazy(() => import(/*webpackChunkName: 'FullPizza' */ './pages/FullPizza'));
const NotFound = React.lazy(() => import( /*webpackChunkName: 'NotFound' */ './pages/NotFound'));


function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLaoyout />}>
        <Route path='' element={<Home />} />
        <Route path='cart' element ={
        <Suspense fallback={<div>Идет загрузка корзины</div>}>
          <Cart/>
       </Suspense>
          }
         />
        <Route path='pizza/:id' element={
        <Suspense fallback={<div>Идет загрузка пиццы</div>}>
          <FullPizza />
        </Suspense>
        } />
        <Route path='*' element={
        <Suspense fallback={<div>Loading...</div>}>
          <NotFound />
        </Suspense>
        } />
      </Route>
    </Routes>
  );
}

export default App;