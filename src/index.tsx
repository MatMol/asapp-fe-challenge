import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import citiesReducer from './reducers/citiesReducer';

const store = configureStore({ reducer: citiesReducer })

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
