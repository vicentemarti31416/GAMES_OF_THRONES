import { Link, useParams } from "react-router-dom";
import './Casas_Details.scss';
import { useEffect, useState } from "react";
import axios from "axios";
import 'simplebar-react/dist/simplebar.min.css';
import { useContext } from "react";
import HousesContext from "../../shared/HousesContext";
import { useNavigate } from 'react-router-dom';

export default function Casas_Details() {

    const [personaje, setPersonaje] = useState([]);
    const { id } = useParams();
    const houses = useContext(HousesContext);
    const [house, setHouse] = useState(null);
    let houseImage = null;
    const navigate = useNavigate();

    const handleBackButtonClick = () => {
        navigate(-1);
    };

    useEffect(() => {
        axios
            .get('http://localhost:3000/houses')
            .then((response) => {
                const filteredHouse = response.data.find((house) => house.id === parseInt(id));
                setHouse(filteredHouse);
            })
            .catch((error) => console.log(error));
    }, [id]);

    return (
        <div className="main__personajes--details">
            <div className="personajes__container--details">
                <div className="header__personajes__container--details">
                    <div onClick={handleBackButtonClick} className="input__personajes__container--details">
                        <img className="vector__return" src="/vector.png" alt="Atrás" />
                    </div>
                    <div className="flags__personajes--details">
                        <Link className="link" to="/"><img src="/Group.png" alt="icono home" className="home__personajes__icon--details "></img></Link>
                        <img src="/spain1.png" alt="bandera española"></img>
                        <img src="/united-kingdom1.png" alt="bandera inglesa"></img>
                    </div>
                </div>

                <div className="main__container--details">
                    <div className="principal__container--details">
                        <div className="image__container--details">
                            {house && house.image && <img className="image--details" src={'http://localhost:3000' + house.image} alt="imagen del personaje"></img>}
                        </div>
                        <h1>{personaje.name}</h1>
                    </div>
                    <div className="secondary__container--details">
                        <div className="secondary__container--text">
                            <div className="secondary__container--text">
                                <h3 className="">ASENTAMIENTO</h3>
                                {house && house.settlement && <p className="secondary--text">{house.settlement}</p>}
                            </div>
                        </div>
                        <div className="secondary__container--text">
                            <h3 className="">REGION</h3>
                            {house && house.region && <p className="secondary--text">{house.region}</p>}
                        </div>
                        <div className="secondary__container--text">
                            <h3 className="">ALIANZAS</h3>
                            {house && house.alliances && house.alliances.map((alliance, index) => (
                                <p className="secondary--text" key={index}>{alliance}</p>
                            ))}
                        </div>
                        <div className="secondary__container--text">
                            <h3 className="">RELIGIONES</h3>
                            {house && house.religions && house.religions.map((religion, index) => (
                                <p key={index}>{religion}</p>
                            ))}
                        </div>
                        <div className="secondary__container--text">
                            <h3 className="">FUNDACION</h3>
                            {house && house.foundation && <p>{house.foundation}</p>}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}