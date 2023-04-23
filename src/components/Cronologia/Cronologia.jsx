import { Link } from "react-router-dom";
import './Cronologia.scss';
import { useEffect, useState } from "react";
import axios from "axios";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { useTranslation } from 'react-i18next';

export default function Cronologia() {

    const [personajes, setPersonajes] = useState([]);
    const [allPersonajes, setAllPersonajes] = useState([]);
    const [orderNumber, setOrderNumber] = useState(1);
    const [t, i18n] = useTranslation("global");

    useEffect(() => {
        axios
            .get('http://localhost:3000/characters')
            .then((response) => {
                setAllPersonajes(response.data);
                setPersonajes(response.data);
            })
            .catch((error) => console.log(error))
    }, []);

    const searchCharacters = (name) => {
        if (name === '') {
            setPersonajes(allPersonajes);
        } else {
            let characters = allPersonajes.filter((personaje) => personaje.name.toLowerCase().includes(name.toLowerCase()));
            characters.forEach((character) => console.log(character));
            setPersonajes(characters);
        }
    };

    const ordenarPersonajes = (() => {
        const personajesInvertidos = [...personajes].reverse();
        setPersonajes(personajesInvertidos);
        setOrderNumber(orderNumber === 1 ? personajes.length : 1); // Modifica el valor de orderNumber
    })

    return (
        <div className="main__personajes">
            <div className="personajes__container">
                <div className="header__container">
                    <div className="input__container">

                    </div>
                    <div className="flags">
                        <Link className="link" to="/"><img src="/Group.png" alt="icono home" className="home__icon"></img></Link>
                        <img onClick={() => i18n.changeLanguage("es")} className="vector__return" src="/spain1.png" alt="bandera española"></img>
                        <img onClick={() => i18n.changeLanguage("en")} className="vector__return" src="/united-kingdom1.png" alt="bandera inglesa"></img>
                    </div>
                </div>

                <div className="simplebar__container">
                    <SimpleBar style={{ height: '700px' }}>
                        <div className="vertical__arrow__image--container">
                            <div onClick={ordenarPersonajes} className="vertical__circle__image--container">
                                <div className="text__button--cronologia">{orderNumber}</div>
                            </div>
                            <div><img src="vertical_arrow.png" alt="arrow image"></img></div>
                        </div>
                        <div className="characters__container">
                            {
                                personajes.map((personaje) => (
                                    <div className="card__container container" key={personaje.name}>
                                        <h5 className="cronologia__text--id">{personaje.id}</h5>
                                        <h3 className="cronologia__text--name">{personaje.name}</h3>
                                        <img className="cronologia__text--image" src={'http://localhost:3000' + personaje.image} alt="imagen del personaje"></img>
                                    </div>
                                ))
                            }
                        </div>
                    </SimpleBar>
                </div>

                <footer className="inicio__footer">
                    <nav className="inicio__nav">
                        <Link className="link" to="/personajes">{t("inicio.personajes")}</Link>
                        <Link className="link" to="/casas">{t("inicio.casas")}</Link>
                        <Link className="link" to="/cronologia">{t("inicio.cronologia")}</Link>
                    </nav>
                </footer>
            </div>
        </div>
    );
}