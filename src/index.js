import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import './assets/styles/base.scss'
import Main from './pages/Main'
import configureStore from './config/configureStore'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

const store = configureStore();
const rootElement = document.getElementById('root');

const renderApp = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </Provider>,
    rootElement
  );
};

renderApp(Main);

if (module.hot) {
  module.hot.accept('./pages/Main', () => {
    const NextApp = require('./pages/Main').default
    renderApp(NextApp);
  });
}

registerServiceWorker();

