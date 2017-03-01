import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './containers/App';

const rootEl = document.getElementById('root');

const render = Component =>
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    rootEl
  );


render(App);

if (module.hot) module.hot.accept('./containers/App', () => render(App));