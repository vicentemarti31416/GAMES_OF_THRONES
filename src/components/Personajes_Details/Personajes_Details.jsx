import { Link, useParams } from "react-router-dom";
import './Personajes_Details.scss';
import { useEffect, useState } from "react";
import axios from "axios";
import 'simplebar-react/dist/simplebar.min.css';
import { useContext } from "react";
import HousesContext from "../../shared/HousesContext";
import { useNavigate } from 'react-router-dom';

export default function Personajes_Details() {

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
            .get('http://localhost:3000/characters')
            .then((response) => {
                const filteredPersonaje = response.data.find((personaje) => personaje.id === parseInt(id));
                setPersonaje(filteredPersonaje);
                const filteredHouse = houses.find((house) => filteredPersonaje.house === house.name);
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
                        <div className="image__container--details"><img className="image--details" src={'http://localhost:3000' + personaje.image} alt="imagen del personaje"></img></div>
                        <h1>{personaje.name}</h1>
                    </div>
                    <div className="secondary__container--details">
                        <div className="secondary__container--text">
                            <h3 className="">CASA</h3>
                            {house && house.image && <div className="image__container--details">
                                <img className="image--details" src={'http://localhost:3000' + house.image} alt="imagen del escudoS"></img>
                            </div>}
                        </div>
                        <div className="secondary__container--text">
                            <h3 className="">ALIANZAS</h3>
                            {personaje.alliances && personaje.alliances.map((alliance, index) => (
                                <p className="secondary--text" key={index}>{alliance}</p>
                            ))}
                        </div>
                        <div className="secondary__container--text">
                            <h3 className="">APARICIONES</h3>
                            {personaje.episodes && personaje.episodes.map((episode, index) => (
                                <p key={index}>{episode}</p>
                            ))}
                        </div>
                        <div className="secondary__container--text">
                            <h3 className="">PADRES</h3>
                            {personaje.parents && personaje.parents.map((parent, index) => (
                                <p key={index}>{parent}</p>
                            ))}
                        </div>
                        <div className="secondary__container--text">
                            <h3 className="">HIJOS</h3>
                            {personaje.siblings && personaje.siblings.map((sibling, index) => (
                                <p key={index}>{sibling}</p>
                            ))}
                        </div>
                        <div className="secondary__container--text">
                            <h3 className="">TITULOS</h3>
                            {personaje.titles && personaje.titles.map((title, index) => (
                                <p key={index}>{title}</p>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}