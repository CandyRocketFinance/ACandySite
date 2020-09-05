import React, {useState, useEffect} from 'react'
import TronLinkGuide from './Components/TronLinkGuide';
import TronWeb from 'tronweb'
import logo from './logo.svg'
import Utils from './utils';
import './App.css'
import Header from './Components/Header'
import Staking from './Components/Staking'
import Footer from './Components/Footer'
const FOUNDATION_ADDRESS = 'TWiWt5SEDzaEqS6kE5gandWMNfxR2B5xzg';
function App() {

  const [loading, setLoading] = useState(false)
  const [tronWebState, setTronWebState] = useState({
    installed: false,
    loggedIn: false
  })

  useEffect(()=>{
    const tronWebState = {
      installed: !!window.tronWeb,
      loggedIn: window.tronWeb && window.tronWeb.ready
    }
    if(tronWebState.installed) {
      setTronWebState(tronWebState)
      return
    }
    let tries = 0
    const timer = setInterval(() => {
      if(tries >= 10) {
        const TRONGRID_API = 'https://api.trongrid.io';
        window.tronWeb = new TronWeb(
          TRONGRID_API,
          TRONGRID_API,
          TRONGRID_API
        )
        setTronWebState(
          {
            installed: false,
            loggedIn: false
          }
        )
        clearInterval(timer)
        return
      }
      tronWebState.installed = !!window.tronWeb
      tronWebState.loggedIn = window.tronWeb && window.tronWeb.ready
      if(!tronWebState.installed)
        return tries++
      clearInterval(timer)
      setTronWebState(tronWebState)
    }, 100)

  },[])

  useEffect(()=>{
    let eventHandler = null
    if(!tronWebState.loggedIn && !!window.tronWeb) {
      window.tronWeb.defaultAddress = {
        hex: window.tronWeb.address.toHex(FOUNDATION_ADDRESS),
        base58: FOUNDATION_ADDRESS
      };
      eventHandler = window.tronWeb.on('addressChanged', () => {
        if(tronWebState.loggedIn)
          return;

        setTronWebState({
          installed: true,
          loggedIn: true
        });
      })
    }
    if(!!window.tronWeb)
      Utils.setTronWeb(window.tronWeb);
  },[tronWebState])

  return (
    <div className="App">
      <Header />
      {!tronWebState.installed &&
        <TronLinkGuide />
      }
      {(!tronWebState.loggedIn && tronWebState.installed) &&
        <TronLinkGuide installed />
      }
      <Staking />
      <Footer />
    </div>
  );
}

export default App;
