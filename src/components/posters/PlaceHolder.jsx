const PlaceHolder = () => {
    return (
        <div className="relative w-full h-full transition-transform duration-300 hover:scale-110 z-0 bg-cover hover:cursor-pointer place-holder">
            <div className="flex items-center opacity-0 hover:opacity-100 transition-all duration-300 h-full w-full hover:bg-gradient-to-t from-black to-black/20">
                <div className="h-10/12 w-10/12 ml-auto mr-auto flex flex-col items-center select-none">
                    <p className="h-full w-full text-white text-center font-bold">...</p> {/* Add decorative "..." */}
                    <p className="h-full w-full text-white text-left font-extrabold border-l-white border-l-4 pl-2">Loading. . .</p>  
                    <div className="h-32 w-full mt-4">
                        <p className="h-fit w-full text-white text-center font-normal">Loading</p>
                        <p className="h-fit w-full text-white text-center font-normal">...</p>
                    </div>    
                </div>
            </div>
        </div>
    );
}

export default PlaceHolder;