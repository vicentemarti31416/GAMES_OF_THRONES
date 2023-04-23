import { Link } from "react-router-dom";
import './Inicio.scss';
import { useTranslation } from 'react-i18next';

export default function Inicio () {

    const [t, i18n] = useTranslation("global");

    return (
        <div className="main__inicio">
            <div className="inicio__container">
                <div className="text__inicio">
                    <h1 className="text__inicio--h1">{t("inicio.titulo")}</h1>
                </div>
                <footer className="inicio__footer">
                    <nav className="inicio__nav">
                        <Link className="link" to="/personajes">{t("inicio.personajes")}</Link>
                        <Link className="link" to="/casas">{t("inicio.casas")}</Link>
                        <Link className="link" to="/cronologia">{t("inicio.cronologia")}</Link>
                    </nav>
                </footer>
                <div className="flags">
                    <img onClick={() => i18n.changeLanguage("es")} className="vector__return" src="/spain1.png" alt="bandera española"></img>
                    <img onClick={() => i18n.changeLanguage("en")} className="vector__return" src="/united-kingdom1.png" alt="bandera inglesa"></img>
                </div>
            </div>
        </div>
    );
}

