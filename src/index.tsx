import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Loader from './components/shared/Loader/Loader';
import GlobalProvider from './Contexts/GlobalContext';
import './index.css';
import 'react-circular-progressbar/dist/styles.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <GlobalProvider>
          <App />
        </GlobalProvider>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
