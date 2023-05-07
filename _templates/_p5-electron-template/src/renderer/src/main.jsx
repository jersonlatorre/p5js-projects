import React from 'react'
import ReactDOM from 'react-dom/client'
import { createGlobalStyle } from 'styled-components'

import App from './App'

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
  }
  
  body {
    height: 100vh;
    font-family: Arial, Helvetica, sans-serif;
    background-color: black;
    overflow: hidden;
    display: grid;
    place-items: center;
  }

  canvas {
    display: block;
  }
`

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    {/* <React.StrictMode> */}
    <GlobalStyle />
    <App />
    {/* </React.StrictMode> */}
  </>
)
