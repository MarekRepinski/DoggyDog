/* Small info about the app */ 
import './about.css';
import { useHistory, useParams } from 'react-router-dom';

const About = () => {
let history = useHistory();

    return (
        <div className="ddc-about wrapper">
            <div className="ddc-about info-card">
                This app was coded by Marek Repinski as a schoolproject.<br />
                Please vist <a href="https://github.com/MarekRepinski">my Git Hub</a> for more apps.<br />
                <button onClick={history.goBack}>Back</button>
            </div>
        </div>

    )
}


export default About;