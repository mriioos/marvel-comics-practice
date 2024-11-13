const StaticPoster = ({ comic }) => {

    const not_available_img = {
        url : 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg',
        fallback_url : 'https://cdn.marvel.com/content/1x/default/comic-no-img.jpg'
    }

    const original_url = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;

    const img_url = original_url != not_available_img.url ? original_url : not_available_img.fallback_url;

    return (
        <div className="w-full h-full relative transition-transform duration-300 hover:scale-110 z-0 bg-cover hover:cursor-pointer" style={{ backgroundImage:`url(${img_url})` }}></div>
    ); 
}

export default StaticPoster;