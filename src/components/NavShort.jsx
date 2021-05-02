import './navshort.css';
import logo from '../img/logo3.png';

const NavShort = () => {
    return (
        <div className="nav">
            <img className="nav logo" src={logo} alt="" />
            <div className="nav header-text">Doggy Daycare</div>
            <div className="nav push"></div>
        </div>
    )
}

export default NavShort;