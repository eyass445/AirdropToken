import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'
import Test from './Test';
import Airdrop from './Airdrop';



function getLibrary(provider,connector) {
  return new Web3(provider)
}

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
    <App/>
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals(); 





