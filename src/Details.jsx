import { useParams, useNavigate } from 'react-router-dom';

import NavBar from "./components/NavBar";
import PlaceHolder from './components/posters/PlaceHolder';
import StaticPoster from './components/posters/StaticPoster.jsx';
import { useState, useEffect } from 'react';
import Carousel from './components/Carousel.jsx';

const Details = ({ config }) => {

    const navigate = useNavigate();

    const { api, credentials } = config;

    const { id } = useParams();

    const [comic, setComic] = useState(null);

    const [charactersImages, setCharactersImages] = useState([]);
    
    useEffect(() => {
        fetch(`${api.domain + api.endpoints.comics}/${id}?ts=${credentials.keys.timestamp}&apikey=${credentials.keys.public}&hash=${credentials.md5hash}`)
        .then((response) => response.json())
        .then((json) => {
            setComic(json.data.results[0]);
            return fetch(`${api.domain + api.endpoints.comics}/${id}/characters?ts=${credentials.keys.timestamp}&apikey=${credentials.keys.public}&hash=${credentials.md5hash}`);
        })
        .then((response) => response.json())
        .then((characters) => {
            setCharactersImages(characters.data.results.map((character) => ({
                url : `${character.thumbnail.path}.${character.thumbnail.extension}`,
                title : character.namecdcd
            })));

            if(characters.data.results.length == 0) setCharactersImages([{ url : '', title : 'No characters provided' }]);
        })
        .catch(console.error);
    }, []);

    return(
        <>
            <NavBar></NavBar>
            <div className="pt-24 h-fit w-3/4 ml-auto mr-auto">
                <div onClick={() => navigate('/')} className="flex h-[3em] w-[100px] items-center justify-center rounded-md tracking-[1px] transition-all duration-200 ease-linear cursor-pointer border-0 bg-[#ec1d24] group hover:scale-[1.03]">
                    <svg className="mt-[0.1rem] group-hover:font-[1.2em] group-hover:translate-x-[-5px] mr-[5px] ml-[5px] text-[20px] transition-all duration-400 ease-in" height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
                    <span className="font-bold">All</span>
                </div>
            </div>
            <div className="h-full w-full">
                <div className="h-fit mt-8 flex justify-center flex-wrap">
                    <div className="w-64 h-96 pointer-events-none mb-6">
                        {!comic && <PlaceHolder></PlaceHolder>}
                        {comic && <StaticPoster comic={comic}></StaticPoster>}
                        {comic && <p className="font-bold text-left text-white">${comic?.prices?.[0]?.price || 'None'}</p>}
                    </div>
                    <div className="h-fit md:h-96 w-4/5 md:w-2/4 md:ml-4 flex flex-col">
                        <p className="h-fit w-full text-white text-left text-2xl font-extrabold border-l-white border-l-4 pl-2 mt-4 mb-2">{comic?.title || '. . .'}</p>
                        {comic && (() => {
                            const creators = comic.creators.items.map(creator => creator.name);
                            return(
                                <p className="h-fit w-full text-white text-left font-normal pb-4">
                                    {creators.slice(0, -1).join(', ') + (creators.length > 1 ? ' & ' : '') + creators.slice(-1)}
                                </p>
                            );
                        })()}
                        <div className="w-full h-52 md:h-full md:max-h-52 flex-grow-1 mt-auto">
                            <Carousel images={charactersImages}></Carousel>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-fit w-3/4 mr-auto ml-auto mt-8 mb-8">
                <p className="font-bold text-center text-white">{comic?.textObjects?.[0]?.text.replace(/<[^>]*?>/g, ' ') || 'No description is provided'}</p>
            </div>
        </>
    )
}

export default Details;