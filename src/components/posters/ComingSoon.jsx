const ComingSoon = () => {
    return (
        <div className="relative w-full h-full transition-transform duration-300 hover:scale-110 z-0 bg-cover hover:cursor-pointer" style={{ backgroundImage:`url(https://cdn.marvel.com/content/1x/default/comic-no-img.jpg)` }}>
            <div className="absolute top-0 left-0 flex items-center opacity-100 transition-all duration-300 h-full w-full bg-gradient-to-t from-black to-black/20">
                <div className="h-10/12 w-10/12 ml-auto mr-auto flex flex-col items-center select-none">
                    <p className="h-full w-full text-white text-center font-bold">...</p> {/* Add decorative "..." */}
                    <p className="h-full w-full text-white text-left font-extrabold border-l-white border-l-4 pl-2">Coming Soon. . .</p>  
                    <div className="h-32 w-full mt-4">
                        <p className="h-fit w-full text-white text-center font-normal">? ? ?</p>
                    </div>    
                </div>
            </div>
        </div>
    )
}

export default ComingSoon;