import { Link } from "react-router-dom";
import './Inicio.scss';

export default function Inicio () {

    return (
        <div className="main__inicio">
            <div className="inicio__container">
                <div className="text__inicio">
                    <h1 className="text__inicio--h1">GAME OF THRONES</h1>
                </div>
                <footer className="inicio__footer">
                    <nav className="inicio__nav">
                        <Link className="link" to="/personajes">Personajes</Link>
                        <Link className="link" to="/casas">Casas</Link>
                        <Link className="link" to="/cronologia">Cronología</Link>
                    </nav>
                </footer>
                <div className="flags">
                    <img src="/spain1.png" alt="bandera española"></img>
                    <img src="/united-kingdom1.png" alt="bandera inglesa"></img>
                </div>
            </div>
        </div>
    );
}

