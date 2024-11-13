import { useNavigate } from 'react-router-dom';
import { useState } from 'react'

import FavouritePosterButton from './FavouritePosterButton.jsx'

const Poster = ({ comic, favourite, setFavourite }) => {

    const navigate = useNavigate();

    const not_available_img = {
        url : 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg',
        fallback_url : 'https://cdn.marvel.com/content/1x/default/comic-no-img.jpg'
    }

    const original_url = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;

    const img_url = original_url != not_available_img.url ? original_url : not_available_img.fallback_url;

    return (
        <div onClick={() => navigate(`/details/${comic.id}`)} className="w-full h-full relative transition-transform duration-300 hover:scale-110 z-0 bg-cover hover:cursor-pointer" style={{ backgroundImage:`url(${img_url})` }}>
            <div className="relative flex items-center lg:opacity-0 hover:opacity-100 transition-all duration-300 h-full w-full bg-gradient-to-t lg:bg-none hover:bg-gradient-to-t from-black to-black/20">
                <div className="h-10/12 w-10/12 ml-auto mr-auto flex flex-col items-center select-none">
                    <p className="h-full w-full text-white text-center font-bold">...</p> {/* Add decorative "..." */}
                    <p className="h-full w-full text-white text-left font-extrabold border-l-white border-l-4 pl-2">{comic.title}</p>  
                    <div className="h-32 w-full mt-4">
                        {comic.creators.items.slice(0, 4).map((creator, index) => <p key={index} className="h-fit w-full text-white text-center font-normal">{creator.name}</p>)}
                        {comic.creators.items.length > 4 && <p key={-1} className="h-fit w-full text-white text-center font-normal">...</p>}
                    </div>
                </div>
            </div>
            <div className="absolute top-4 right-6 h-8 w-8">
                <FavouritePosterButton favourite={favourite} setFavourite={setFavourite}></FavouritePosterButton>
            </div>
        </div>
    ); 
}

export default Poster;