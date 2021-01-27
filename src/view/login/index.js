import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import firebase from '../../config/firebase';
import {Link, Redirect} from 'react-router-dom';
import 'firebase/auth';
import './login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [msgTipo, setMsgTipo] = useState('');
    const dispatch = useDispatch();

    function login() {
        firebase.auth().signInWithEmailAndPassword(email, senha)
        .then(result => {
            setMsgTipo('sucesso');
            setTimeout(() => {
                dispatch({type: 'LOG_IN', userEmail: email});
            }, 2000);
        }).catch(error => {
            setMsgTipo('erro');
        });

    }

    return (<>
        <div className="login-content d-flex align-items-center">
            {useSelector(state => state.userLogged) > 0 ? <Redirect to='/' /> : null}

            <form className="form-signin mx-auto">
                <div className="text-center mb-4">
                    <i class="far fa-smile-wink text-white fa-5x"></i>
                    <h1 className="h3 mb-3 font-weight-normal text-white font-weight-bold">Login</h1>
                </div>

                <input onChange={(e) => setEmail(e.target.value)} type="email" id="inputEmail" className="form-control my-2" placeholder="Email"  autocomplete="off" />
                <input onChange={(e) => setSenha(e.target.value)} type="password" id="inputPassword" className="form-control my-2" placeholder="Senha" />

                <button onClick={login} className="btn btn-lg btn-block btn-login" type="button">Acessar</button>

                <div className="msg-login text-white text-center my-5">
                    {msgTipo === 'sucesso' && <span><strong>WoW!</strong> Você já está conectado! &#128526;</span>}
                    {msgTipo === 'erro' && <span><strong>Ops!</strong> Verifique se a senha ou usuário estão corretos! &#128546;</span>}
                </div>

                <div className="options-login mt-5 text-center">
                    <Link to="/userrecover" className="mx-2">Recuperar Senha</Link>
                    <span className="text-white">&#9733;</span>
                    <Link to='newuser' href="#" className="mx-2">Quero Cadastrar</Link>
                </div>
            </form>
        </div>
    </>);
};

export default Login;
