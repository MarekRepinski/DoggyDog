/* Navigation top bar */ 
import './nav.css';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import logo from '../img/logo3.png';
import magGlasss from '../img/Magnifying Glass.png';
import menuImg from '../img/menu.png';
let searchString = '';

const Nav = ({ searchDogs }) => {
    const [showSearch, setShowSearch] = useState(false);    // Show the search window
    const [showMenu, setShowMenu] = useState(false);        // Show the menu window
    const textInput = useRef(null);                         // Focus on text input field in search window
    const menuWindow = useRef(null);                        // Focus on hidden input fielsd in menu window
    let searchClass = 'nav search-container';
    let menuClass = 'nav menu-dd';
    searchClass = showSearch ? searchClass + ' show' : searchClass;
    menuClass = showMenu ? menuClass + ' show' : menuClass;

    useEffect(() => {
        if (showSearch) { textInput.current.focus(); }
    }, [showSearch]);

    useEffect(() => {
        if (showMenu) { menuWindow.current.focus(); }
    }, [showMenu]);

    return (
        <div className="nav">
            <img className="nav logo" src={logo} alt="" />
            <div className="nav header-text">Doggy Daycare</div>
            <div className="nav push">
                <img id="open-search" className="nav logo" src={magGlasss} alt="search" onClick={() => setShowSearch(!showSearch)} />
            </div>
            <div>
                <img id="open-menu" className="nav logo" src={menuImg} alt="menu" onClick={() => setShowMenu(!showMenu)} />
                <div className={menuClass}>
                    <div className="navx menu-option">Webcam</div>
                    <div className="navx menu-option">Apply</div>
                    <Link to="/about" className="navx menu-link">
                        <div className="navx menu-option">About</div>
                    </Link>
                    <input type="text" className="navx dummy-input" size="1"  ref={menuWindow} onBlur={() => {
                        setTimeout(() => {
                            setShowMenu(false);
                        }, 500)
                    }} />
                </div>
            </div>
            <div className={searchClass}>
                <input type="text" size="15" ref={textInput} defaultValue=''
                    onChange={(e) => { searchString = e.target.value }}
                    onBlur={(e) => {
                        setTimeout(() => {
                            e.target.value = '';
                            setShowSearch(false);
                            searchString = '';
                        }, 500)
                    }} />
                <button id="search" className="navx search-button" type="button" onClick={() => {
                    searchDogs(searchString);
                }}>Search</button>
            </div>
        </div>
    )
}

export default Nav;