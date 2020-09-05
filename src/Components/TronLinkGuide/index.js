import React from 'react';

import TronLinkLogo from './TronLinkLogo.png';
import './TronLinkGuide.css';

const TRONLINK_URL = 'https://tronlink.org';

const logo = (
    <div className='logo'>
        <img src={ TronLinkLogo } alt='TronLink logo' />
    </div>
);

const openTronLink = () => {
    window.open(TRONLINK_URL, '_blank');
};

const TronLinkGuide = props => {
    const {
        installed = false
    } = props

    if(!installed) {
      return (
        <div className='tronLink' onClick={ openTronLink }>
          <div className='info'>
            <h1>TronLink Required</h1>
            <p>
            You must install the Chrome plugin or mobile app from <a href={ TRONLINK_URL } target='_blank' rel='noopener noreferrer'>tronlink.org</a>.
            Once installed, refresh the page.
            </p>
          </div>
          { logo }
        </div>
      );
    }

    return (
        <div className='tronLink hover' onClick={ openTronLink }>
            <div className='info'>
                <h1>Log in Required</h1>
                <p>
                    TronLink is installed but you must first log in. <br/>
                    Open the TronLink plugin and log in.
                </p>
            </div>
            { logo }
        </div>
    );
};

export default TronLinkGuide;
