import React, { useState } from 'react';
import NavBar from '../../components/navBar';
import firebase from '../../config//firebase';
import 'firebase/auth';
import './new-user.css';

function NewUser() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [msgTipo, setMsgTipo] = useState('');
    const [loading, setLoading] = useState(0);
    const [msg, setMsg] = useState('');

    function register() {
        setMsgTipo(null);
        setLoading(1);

        if (!email || !senha) {
            setMsgTipo('erro');
            setMsg('Você precisa informar o email e senha para fazer o cadastro!');
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(email, senha)
            .then(result => {
                setLoading(0);
                setMsgTipo('sucesso');
            }).catch(error => {
                setLoading(0);
                setMsgTipo('erro');
                switch (error.message) {
                    case 'Password should be at least 6 characteres':
                        setMsg('A senha deve ter pelo menos 6 caracteres!');
                        break;
                    case 'The email address is already in use by another account':
                        setMsg('Este email já em uso!');
                        break;
                    case 'The email address is badly formatted':
                        setMsg('O formato do email é iválido!');
                        break;
                    default:
                        setMsg('Erro ao cadastrar');
                        break;
                }
            });
    }

    return (<>
        <NavBar />
        
        <div className="form-register">
            <form className="text-center form-login mx-auto mt-5">
                <h1 className="h3 mb-3 text-black font-weight-bold">Cadastro</h1>

                <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control my-2" placeholder="Email" autoComplete="off" />
                <input onChange={(e) => setSenha(e.target.value)} type="password" className="form-control my-2" placeholder="Senha" autoComplete="off" />

                {!loading ? <button onClick={register} type="button" className="btn btn-lg btn-block mt-3 mb-5 btn-register">Cadastrar</button> : <div class="spinner-border text-danger" role="status"><span class="sr-only">Loading...</span></div>}

                <div className="msg-login text-black text-center my-5">
                    {msgTipo === 'sucesso' && <span><strong>WoW!</strong> Usuário cadastradao com sucesso! &#128526;</span>}
                    {msgTipo === 'erro' && <span><strong>Ops!</strong> {msg} &#128546;</span>}
                </div>
            </form>
        </div>
    </>);
};

export default NewUser;
