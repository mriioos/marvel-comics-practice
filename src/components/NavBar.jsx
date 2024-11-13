import MarvelLogo from "./MarvelLogo";

const NavBar = () => { 
    return (
        <nav className="z-10 w-full fixed bg-marvel_red shadow">
            <div className="p-2 ml-auto mr-auto w-fit">
                <MarvelLogo></MarvelLogo>
            </div>
        </nav>
    );
}

export default NavBar;