import './nav.css';
import { useState, useEffect, useRef } from 'react';
import logo from '../img/logo3.png';
import magGlasss from '../img/Magnifying Glass.png';
import menuImg from '../img/menu.png';
let searchString = '';

const Nav = ({ searchDogs }) => {
    const [showSearch, setShowSearch] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const textInput = useRef(null);
    const menuWindow = useRef(null);
    let searchClass = 'nav search-container';
    let menuClass = 'nav menu-dd';
    searchClass = showSearch ? searchClass + ' show' : searchClass;
    menuClass = showMenu ? menuClass + ' show' : menuClass;

    useEffect(() => {
        if (showSearch) { textInput.current.focus(); }
    }, [showSearch]);

    useEffect(() => {
        console.log('showMenu: ' + showMenu);
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
                    <div className="navx menu-option">About</div>
                    <input type="text" className="navx dummy-input" size="1"  ref={menuWindow} onBlur={() => {
                        console.log('Bluring');
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
                    console.log(searchString);
                    searchDogs(searchString);
                }}>Search</button>
            </div>
        </div>
    )
}

export default Nav;