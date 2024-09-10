import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from '@/routes';
import store from './store';
import React from 'react';
import { Provider } from 'react-redux';

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>
  );
}

export default App;