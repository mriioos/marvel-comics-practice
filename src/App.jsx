// General
import { useState, useEffect } from 'react';

// Styles
import './App.css';

// Components
import Poster from './components/posters/Poster.jsx';
import NavBar from './components/NavBar.jsx';
import PlaceHolder from './components/posters/PlaceHolder.jsx';
import ComingSoon from './components/posters/ComingSoon.jsx';
import Observable from './components/Observable.jsx';

// Application
function App({ config }) {

  const { api, credentials, storage } = config;

  const [comics, setComics] = useState([]);

  const [load, setLoad] = useState(false);
  const [offset, setOffset] = useState(0);
  
  const [favourites, setFavourites] = useState(JSON.parse(localStorage[storage.favourites] || '[]'));

  // Wrapper function to get sorted comics
  function setSortedComics(new_comics){

    const auxComics = new_comics || comics;

    // Create sorted comics array
    const sorted = [
      ...auxComics.filter(comic => favourites.includes(comic.id)).sort((comic1, comic2) => new Date(comic2.modified) - new Date(comic1.modified)),
      ...auxComics.filter(comic => !favourites.includes(comic.id)).sort((comic1, comic2) => new Date(comic2.modified) - new Date(comic1.modified))
    ]
    .filter(comic => comic);

    // Set comics
    setComics(sorted);
  }

  // Fetch comics
  useEffect(() => {

    // Fetch comics
    fetch(`${api.domain + api.endpoints.comics}?limit=${api.filters.limit}&offset=0&orderBy=${api.order.modified.desc}&ts=${credentials.keys.timestamp}&apikey=${credentials.keys.public}&hash=${credentials.md5hash}`)
    .then((response) => response.json())
    .then((comics) => {

      // Change offset
      setOffset(offset + api.filters.limit);
      
      // Set sorted comics
      setSortedComics(comics.data.results); 
    }) 
    .catch(console.error);
  }, []);

  // Set load wrapper (Prevents from multiple triggering)
  function safeSetLoad(new_load){

    // Make load one directional, load can only be triggered once (And untriggered just after loading is succesful)
    if(!load && new_load){
      setLoad(true);
    }
  }

  const [scrollPosition, setScrollPosition] = useState(0);

  // Check load flag
  useEffect(() => {

    // Check that load flag is true
    if(load){ 

      // Store the current scroll position before fetching more comics
      const currentScrollPosition = window.scrollY;
      setScrollPosition(currentScrollPosition);

      // Fetch more comics
      fetch(`${api.domain + api.endpoints.comics}?limit=${api.filters.limit}&offset=${offset}&orderBy=${api.order.modified.desc}&ts=${credentials.keys.timestamp}&apikey=${credentials.keys.public}&hash=${credentials.md5hash}`)
      .then((response) => response.json())
      .then((new_comics) => {
        
        // Change offset
        setOffset(offset + api.filters.limit);

        // Set sorted comics
        setSortedComics([...comics, ...new_comics.data.results].filter(comic => comic)); 

        // Set load state to false
        setLoad(false);

        // Restore scroll position after the comics have been loaded
        window.scrollTo(0, scrollPosition);
      }) 
      .catch(console.error);
    }
  }, [load]);

  // Effect to update favourites
  useEffect(() => {

    // Save favourites to localstorage
    localStorage.setItem(storage.favourites, JSON.stringify(favourites));

    // Reorder comics
    setSortedComics();

  }, [favourites]);

  // Function to set if a comic is favourite
  function setFavourite(comic_id, isFavourite){
    
    // Check if it has to become a favourite
    if(isFavourite && !favourites.includes(comic_id)){

      // Save comic id as favourite
      setFavourites([...favourites, comic_id]);
    }

    // Check if it has to be deleted from favourites
    if(!isFavourite && favourites.includes(comic_id)){

      // Delete comic id from favourites
      setFavourites(favourites.filter((favourite_id) => favourite_id != comic_id));
    }
  }

  return (
    <>
      <NavBar></NavBar>
      <div className="h-full w-full pt-16 flex justify-evenly flex-wrap mb-16">
        {comics.length == 0 && Array.from({length : 36}, (_, index) => <div key={index} className="w-64 h-96 mt-8 ml-2 mr-2"><PlaceHolder></PlaceHolder></div>)}
        {comics.length > 0 && comics.map(comic => <div key={comic.id} className="w-64 h-96 mt-8 ml-2 mr-2"><Poster comic={comic} favourite={favourites?.some(favourite => favourite == comic.id) || false} setFavourite={(isFavourite) => setFavourite(comic.id, isFavourite)}></Poster></div>)}
        {comics.length > 0 && <Observable setObserved={safeSetLoad}></Observable> /* New comics loader */} 
        {comics.length > 0 && Array.from({length : 18}, (_, index) => <div key={index} className="w-64 h-96 mt-8 ml-2 mr-2"><PlaceHolder></PlaceHolder></div>)}
        {comics.length > 0 && <div className="w-64 h-96 mt-8 ml-2 mr-2"><ComingSoon></ComingSoon></div>}
      </div>
    </>
  )
}

export default App;