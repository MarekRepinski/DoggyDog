import './nav.css';
import logo from '../img/logo3.png';
import magGlasss from '../img/Magnifying Glass.png';
import menuImg from '../img/menu.png';

const Nav = () => {

    return (
        <div className="nav">
            <img className="nav logo" src={logo} alt="" />
            <div className="nav header-text">Doggy Daycare</div>
            <div className="nav push">
                <img id="open-search" className="nav logo" src={magGlasss} alt="search" />
            </div>
            <div id="menu-container">
                <img id="open-menu" className="nav logo" src={menuImg} alt="menu" />
            </div>
        </div>
    )
}

export default Nav;