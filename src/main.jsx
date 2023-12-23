// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { FilterProvider } from './store/Provider/FilterProvider';
import { CharacterProvider } from './store/Provider/CharacterProvider';


ReactDOM.createRoot(document.getElementById('root')).render(
  <FilterProvider>
    <CharacterProvider>
      <App />
    </CharacterProvider>
  </FilterProvider>


)
