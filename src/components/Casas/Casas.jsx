import { Link } from "react-router-dom";
import './Casas.scss';
import { useEffect, useState } from "react";
import axios from "axios";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { useTranslation } from 'react-i18next';

export default function Casas() {

    const [houses, setHouses] = useState([]);
    const [allHouses, setAllHouses] = useState([]);
    const [t, i18n] = useTranslation("global");

    useEffect(() => {
        axios
            .get('http://localhost:3000/houses')
            .then((response) => {
                setAllHouses(response.data);
                setHouses(response.data);
            })
            .catch((error) => console.log(error))
    }, []);

    const searchHouses = (name) => {
        if (name === '') {
            setHouses(allHouses);
        } else {
            let casas = allHouses.filter((house) => house.name.toLowerCase().includes(name.toLowerCase()));
            setHouses(casas);
        }
    };

    return (
        <div className="main__casas">
            <div className="casas__container">
                <div className="header__casas__container">
                    <div className="input__casas__container">
                        <img className="input__casas__icon" src="search1.png" alt="search icon"></img>
                        <input onInput={(event) => searchHouses(event.target.value)} className="input__casas__bottom-border" placeholder={t('inicio.buscador')}></input>
                    </div>
                    <div className="flags__casas">
                        <Link className="link" to="/"><img src="/Group.png" alt="icono home" className="home__casas__icon"></img></Link>
                        <img onClick={() => i18n.changeLanguage("es")} className="vector__return" src="/spain1.png" alt="bandera española"></img>
                        <img onClick={() => i18n.changeLanguage("en")} className="vector__return" src="/united-kingdom1.png" alt="bandera inglesa"></img>
                    </div>
                </div>

                <div className="simplebar__casas__container">
                    <SimpleBar style={{ height: '700px' }}>
                        <div className="cards__casas__container">
                            {
                                houses.map((house) => (
                                    <Link className="linked" to={`/casas/${house.id}`} key={house.id}>
                                        <div className="card__casas__container container" key={house.name}>
                                            <img src={'http://localhost:3000' + house.image} alt="imagen de la casa"></img>
                                            <h3 className="house__name">{house.name}</h3>
                                        </div>
                                    </Link>
                                ))
                            }
                        </div>
                    </SimpleBar>
                </div>

                <footer className="casas__footer">
                    <nav className="casas__nav">
                        <Link className="link" to="/personajes">{t("inicio.personajes")}</Link>
                        <Link className="link" to="/casas">{t("inicio.casas")}</Link>
                        <Link className="link" to="/cronologia">{t("inicio.cronologia")}</Link>
                    </nav>
                </footer>
            </div>
        </div>
    );
}