import './splashscreen.css';
import dog1 from '../img/dog1.png';
import dog2 from '../img/dog2.png';
import dog3 from '../img/dog3.png';
import fence from '../img/fence2.png';

const SplashScreen = () => {

    return (
        <div className="splash">
            <div className="splash text">
                DOGGY DAYCARE<br /> Brings the Bow-Wow in to your best friends life.
            </div>
            <div className="splash anim">
                <img id="fence" src={fence} alt=""/>
                <img id="dog1" src={dog1} alt=""/>
                <img id="dog2" src={dog2} alt=""/>
                <img id="dog3" src={dog3} alt=""/>
            </div>
        </div>
    )
}

export default SplashScreen;