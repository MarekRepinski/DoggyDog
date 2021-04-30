import './nav.css';

const Nav = () => {

    return (
        <div className="nav">
            <img className="nav logo" src="./img/logo3.png" alt="" />
            <div className="nav header-text">Doggy Daycare</div>
            <div className="nav push">
                <img id="open-search" className="nav logo" src="./img/Magnifying Glass.png" alt="search" />
            </div>
            <div id="menu-container">
                <img id="open-menu" className="nav logo" src="./img/menu.png" alt="menu" />
            </div>
        </div>
    )
}

export default Nav;