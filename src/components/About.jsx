import './about.css';
import { useHistory, useParams } from 'react-router-dom';

const About = () => {
    return (
        <div className="ddc-about wrapper">
            <div className="dcc-about info-card">
                This app was made by Marek Repinski as a schoolproject.<br />
                Please vist <a href="https://github.com/MarekRepinski">my Git Hub (https://github.com/MarekRepinski)</a> for more apps (ReactJS/IPhone/Android).<br />
                <button>Back</button>
            </div>
        </div>

    )
}


export default About;