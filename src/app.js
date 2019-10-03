import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Header from './components/header'
import Footer from './components/footer'
import MainRouter from './mainRouter'
import { hot } from 'react-hot-loader'

const App = () => {
    return (
      <div className="background-adminpg">
        <div className="backgroundOverlay">
          <BrowserRouter>
            <Header />
            <MainRouter />
            <Footer />
          </BrowserRouter>
        </div>
      </div>
    );
}

export default hot(module)(App)

