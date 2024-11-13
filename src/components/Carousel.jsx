const Carousel = ({ images }) => {
    return (
        <div className="relative h-full w-full">
            <div className="h-full w-full absolute top-0 left-0 overflow-x-scroll flex flex-nowrap flex-row pr-32">
                {images.length > 0 && images.map(({ url, title }, index) => 
                    <div key={index} className="h-full w-32 flex flex-col mr-4">
                        <img className="w-full" src={url}/>
                        <p className="w-32 text-white">{title}</p>
                    </div>
                )}
                {images.length == 0 && Array.from({ length : 36 }, (_, index) =>
                    <div key={index} className="h-full w-32 flex flex-col mr-4">
                        <div className="w-full aspect-square place-holder"></div>
                        <p className="w-32 text-white">? ? ?</p>
                    </div>
                )} 
            </div>
            <div className="h-full w-1/3 absolute top-0 right-0 bg-gradient-to-l from-black to-transparent pointer-events-none"></div>
        </div>
    )
}

export default Carousel;