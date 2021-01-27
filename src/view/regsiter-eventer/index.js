import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navBar'
import { useSelector } from 'react-redux';
import firebase from '../../config/firebase';
import './register.css';


function Register(props) {
    const [events, setEvents] = useState({});
    const [urlImg, setUrlImg] = useState('');
    const [loading, setLoading] = useState(false);
    const [msgTipo, setMsgTipo] = useState('');
    const [titulo, setTitulo] = useState('');
    const [tipo, setTipo] = useState('');
    const [detalhes, setDetalhes] = useState('');
    const [data, setData] = useState('');
    const [hora, setHora] = useState('');
    const [foto, setFoto] = useState('');
    const [fotoAtual, setFotoAtual] = useState('');
    const storage = firebase.storage();
    const db = firebase.firestore();
    const emailUser = useSelector(state => state.userEmail);

    useEffect(() => {
        if (props.match.params.id) {
            firebase.firestore().collection('eventos').doc(props.match.params.id).get().then(res => {
                setTitulo(res.data().titulo);
                setTipo(res.data().tipo);
                setDetalhes(res.data().detalhes);
                setData(res.data().data);
                setHora(res.data().hora);
                setFotoAtual(res.data().foto);
            });
        }
    }, [loading, props.match.params.id]);

    function handleEdit() {
        setMsgTipo(null);
        setLoading(true);

        if (foto) {
            storage.ref(`images/${foto.name}`).put(foto);
            db.collection('eventos').doc(props.match.params.id).update({
                titulo: titulo,
                tipo: tipo,
                detalhes: detalhes,
                data: data,
                hora: hora,
                foto: foto ? foto.name : fotoAtual
            }).then(() => {
                setMsgTipo("sucesso");
                setLoading(false);
            }).catch(err => {
                setMsgTipo('erro');
                setLoading(false);
            });
        }
    }

    function handleRegister() {
        setMsgTipo(null);
        setLoading(true);

        storage.ref(`images/${foto.name}`).put(foto).then(() => {
            db.collection('eventos').add({
                titulo: titulo,
                tipo: tipo,
                detalhes: detalhes,
                data: data,
                hora: hora,
                userEmail: emailUser,
                visualizacoes: 0,
                foto: foto.name,
                publico: 1,
                criacao: new Date(),
            }).then(() => {
                setMsgTipo("sucesso");
                setLoading(false);
            }).catch(err => {
                setMsgTipo('erro');
                setLoading(false);
            });
        });
    }

    return (<>
        <Navbar />
        <div className="col-12 mt-5">
            <div className="row">
                <h3 className="mx-auto font-weight-bold">{props.match.params.id ? "Editar Evento" : "Novo Evento"}</h3>
            </div>

            <form>
                <div className="form-group">
                    <label>Titulo: </label>
                    <input onChange={(e) => setTitulo(e.target.value)} type="text" className="form-control" value={titulo ? titulo : ""} />
                </div>

                <div className="form-group">
                    <label>Tipo Evento: </label>
                    <select onChange={(e) => setTipo(e.target.value)} className="form-control" value={tipo ? tipo : ""}>
                        <option disabled selected value>-- Selecione um tipo --</option>
                        <option>Festa</option>
                        <option>Teatro</option>
                        <option>Show</option>
                        <option>Evento</option>
                    </select>
                </div>


                <div className="form-group">
                    <label>Descrição: </label>
                    <textarea onChange={(e) => setDetalhes(e.target.value)} className="form-control" row="3" value={detalhes ? detalhes : ""}></textarea>
                </div>

                <div className="form-group row">
                    <div className="col-6">
                        <label>Data: </label>
                        <input onChange={(e) => setData(e.target.value)} type="date" className="form-control" value={data ? data : ""} />
                    </div>

                    <div className="col-6">
                        <label>Hora: </label>
                        <input onChange={(e) => setHora(e.target.value)} type="time" className="form-control" value={hora ? hora : ""} />
                    </div>
                </div>

                <div className="form-group">
                    <label>Foto: {props.match.params.id ? `(Você quer manter a foto)` : null}</label>
                    <input onChange={(e) => setFoto(e.target.files[0])} type="file" className="form-control" />
                </div>

                <div className="row">
                    {
                        loading ? <div class="spinner-border text-danger mx-auto" role="status"><span class="sr-only">Loading...</span></div>
                            : <button onClick={props.match.params.id ? handleEdit : handleRegister} type="button" className="btn btn-lg btn-block mt-3 mb-5 btn-register">{props.match.params.id ? "Editar Evento" : "Publicar Evento"}</button>
                    }
                </div>
            </form>

            <div className="msg-login text-black text-center mt-2">
                {msgTipo === 'sucesso' && <span><strong>WoW!</strong> Evento publicado! &#128526;</span>}
                {msgTipo === 'erro' && <span><strong>Ops!</strong> Não foi possível publicar o evento! &#128546;</span>}
            </div>
        </div>
    </>);
}

export default Register;