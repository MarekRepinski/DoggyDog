import './splashscreen.css';

const SplashScreen = () => {

    return (
        <div className="splash">
            <div className="splash text">
                DOGGY DAYCARE<br /> Brings the Bow-Wow in to your best friends life.
            </div>
            <div className="splash anim">
                <img id="fence" src="./img/fence2.png" alt=""/>
                <img id="dog1" src="./img/dog1.png" alt=""/>
                <img id="dog2" src="./img/dog2.png" alt=""/>
                <img id="dog3" src="./img/dog3.png" alt=""/>
            </div>
        </div>
    )
}

export default SplashScreen;