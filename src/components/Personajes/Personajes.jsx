import { Link } from "react-router-dom";
import './Personajes.scss';
import { useEffect, useState } from "react";
import axios from "axios";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { useTranslation } from 'react-i18next';

export default function Personajes() {

    const [personajes, setPersonajes] = useState([]);
    const [allPersonajes, setAllPersonajes] = useState([]);
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

    return (
        <div className="main__personajes">
            <div className="personajes__container">
                <div className="header__personajes__container">
                    <div className="input__personajes__container">
                        <img className="input__personajes__icon" src="search1.png" alt="search icon"></img>
                        <input onInput={(event) => searchCharacters(event.target.value)} className="input__personajes__bottom-border" placeholder={t('inicio.buscador')}></input>
                    </div>
                    <div className="flags__personajes">
                        <Link className="link" to="/"><img src="/Group.png" alt="icono home" className="home__personajes__icon"></img></Link>
                        <img onClick={() => i18n.changeLanguage("es")} className="vector__return" src="/spain1.png" alt="bandera española"></img>
                        <img onClick={() => i18n.changeLanguage("en")} className="vector__return" src="/united-kingdom1.png" alt="bandera inglesa"></img>
                    </div>
                </div>

                <div className="simplebar__container">
                    <SimpleBar style={{ height: '700px' }}>
                        <div className="cards__personajes__container">
                            {
                                personajes.map((personaje) => (
                                    <Link to={`/personajes/${personaje.id}`} key={personaje.id}>
                                        <div className="card__personajes__container container" key={personaje.name}>
                                            <img src={'http://localhost:3000' + personaje.image} alt="imagen del personaje"></img>
                                            <h3 className="overlay">{personaje.name}</h3>
                                        </div>
                                    </Link>
                                ))
                            }
                        </div>
                    </SimpleBar>
                </div>

                <footer className="personajes__footer">
                    <nav className="personajes__nav">
                        <Link className="link" to="/personajes">{t("inicio.personajes")}</Link>
                        <Link className="link" to="/casas">{t("inicio.casas")}</Link>
                        <Link className="link" to="/cronologia">{t("inicio.cronologia")}</Link>
                    </nav>
                </footer>
            </div>
        </div>
    );
}