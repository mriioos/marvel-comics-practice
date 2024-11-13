import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Details from './Details.jsx'

// Configuration
const config = {
  api : {
    domain : 'https://gateway.marvel.com:443',
    endpoints : {
      comics : '/v1/public/comics'
    },
    order : {
      modified : {
        desc : '-modified',
        asc : 'modified'
      }
    },
    filters : {
      limit : 20
    }
  },
  credentials : {
    keys : {
      timestamp : '42',
      private : '86ab65d33f49cbd9791f0aeb975b9e96e08982a6',
      public : 'a6ff17f7cb573b690549b503ebf2cd15'
    },
    md5hash : '9c1de64b7525b490a7c782cd8e928bdd'
  },
  storage : {
    favourites : 'marvel_comics_favourites'
  }
}

createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path="/" element={<App config={config} />}></Route>
      <Route path="/details/:id" element={<Details config={config} />}></Route>
    </Routes>
  </Router>
)

/*
Code used:
  Loading background effect: https://uiverse.io/mrhyddenn/warm-wasp-21
  Return button in details: https://uiverse.io/Jedi-hongbin/modern-sloth-8
  Set favourite Poster star: https://uiverse.io/andrew-demchenk0/light-lionfish-40
*/