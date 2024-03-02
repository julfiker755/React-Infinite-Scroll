import React from 'react';
import ProductList from './components/ProductList';

const App = () => {
  return (
    <div className='w-11/12 lg:max-w-7xl m-auto'>
      <h1>React Infinite Scrolling</h1>
      <ProductList></ProductList>
    </div>
  );
};

export default App;