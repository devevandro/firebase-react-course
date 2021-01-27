import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../../components/navBar';
import firebase from '../../config/firebase';
import 'firebase/auth';
import './userRecover.css';

function UserRecoverPass() {
    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState('');

    function recover () {
        firebase.auth().sendPasswordResetEmail(email).then(result => {
            setMsg('Enviamos um link para o seu email, redefina sus senha!');
        }).catch(err => {
            setMsg('Verifique se o email está correto')
        });
    }

    return (<>
        <NavBar />
        <form className="text-center form-login mx-auto mt-5">
            <h3 className="mb-3 font-wight-bold">Recuperar Senha</h3>
            <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control my-2" placeholder="Email" />
        </form>

        <div className="mgs my-4 text-center">
            <span>{msg}</span>
        </div>

        <button onClick={recover} className="btn btn-lg btn-block my-2 btn-send">Recupera Senha</button>
    </>);
}

export default UserRecoverPass;
