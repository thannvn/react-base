import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/es/integration/react';
import LoadingComponent from 'shared/components/loading/loading.component';
import { ToastContainer } from 'react-toastify';
import App from './App';
import { store } from './store';

const persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<LoadingComponent open />} persistor={persistor}>
        <BrowserRouter>
          <App />
          <ToastContainer />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
