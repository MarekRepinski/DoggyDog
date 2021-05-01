import './nav.css';
import { useState, useEffect, useRef } from 'react';
import logo from '../img/logo3.png';
import magGlasss from '../img/Magnifying Glass.png';
import menuImg from '../img/menu.png';
let searchString = '';

const Nav = ({searchDogs}) => {
    const [showSearch, setShowSearch] = useState(false);
    const textInput = useRef(null);
    let searchClass = 'nav search-container';
    searchClass = showSearch ? searchClass + ' show' : searchClass;

    useEffect(() => {
        if (showSearch) { textInput.current.focus(); }
    }, [showSearch]);

    return (
        <div className="nav">
            <img className="nav logo" src={logo} alt="" />
            <div className="nav header-text">Doggy Daycare</div>
            <div className="nav push">
                <img id="open-search" className="nav logo" src={magGlasss} alt="search" onClick={() => setShowSearch(!showSearch)} />
            </div>
            <div id="menu-container">
                <img id="open-menu" className="nav logo" src={menuImg} alt="menu" />
            </div>
            <div className={searchClass}>
                <input type="text" id="search-input" size="15" ref={textInput} defaultValue=''
                    onChange={(e) => { searchString = e.target.value }}
                    onBlur={(e) => {
                        setTimeout(() => {
                            e.target.value = '';
                            setShowSearch(false);
                            searchString = '';
                        }, 500)
                    }} />
                <button id="search" className="navx search-button" type="button" onClick={() => {
                    console.log(searchString);
                    searchDogs(searchString);
                }}>Search</button>
            </div>
        </div>
    )
}

export default Nav;