import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './navBar.css';

function NavBar() {
    const dispatch = useDispatch();

    return (<>
        <nav className="navbar navbar-expand-lg">
            <i class="far fa-smile-wink text-white fa-2x"></i>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <i class="fas fa-bars text-white"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item"><Link className="nav-link ml-2" to="/">Home</Link></li>

                    {useSelector(state => state.userLogged) > 0 ?
                        <>
                            <li className="nav-item"><Link className="nav-link ml-2" to="/register">Publicar Eventos</Link></li>
                            <li className="nav-item"><Link className="nav-link ml-2" to="/events/my">Meus Eventos</Link></li>
                            <li className="nav-item"><Link className="nav-link ml-2" onClick={() => dispatch({ type: 'LOG_OUT' })}>Sair</Link></li>
                        </>
                        :
                        <>
                            <li className="nav-item"><Link className="nav-link ml-2" to="/newuser">Cadastrar</Link></li>
                            <li className="nav-item"><Link className="nav-link ml-2" to="/login">Login</Link></li>

                        </>
                    }
                </ul>
            </div>
        </nav>
    </>);
};

export default NavBar;
