import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import firebase from '../../config/firebase';
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../../components/navBar'
import './eventDetails.css';

function EventDetails(props) {
    const [events, setEvents] = useState({});
    const [urlImg, setUrlImg] = useState('');
    const [loading, setLoading] = useState(1);
    const [deleted, setDeleted] = useState(0);
    const user = useSelector(state => state.userEmail)

    useEffect(() => {
        if (loading) {
            firebase.firestore().collection('eventos').doc(props.match.params.id).get().then(res => {
                setEvents(res.data());
                firebase.firestore().collection('eventos').doc(props.match.params.id).update('visualizacoes', res.data().visualizacoes + 1);
                firebase.storage().ref(`images/${res.data().foto}`).getDownloadURL().then(url => {
                    setUrlImg(url);
                    setLoading(0);
                });
            });
        }else {
            firebase.storage().ref(`images/${events.foto}`).getDownloadURL().then(url => setUrlImg(url));
        }
    }, []);

    function handleDelete() {
        firebase.firestore().collection('eventos').doc(props.match.params.id).delete().then(() => {
            setDeleted(1)
        });
    }

    return (<>
        <Navbar />

        {deleted > 0 ? <Redirect to='/' /> : null}

        <div className="container-fluid">
            {loading
                ?
                <div className="row"><div class="spinner-border text-danger mx-auto" role="status"><span class="sr-only"></span></div></div>
                :
                <div>
                    <div className="row">

                        <img src={urlImg} alt="Banner" className="img-banner" />
                        <div className="col-12 text-right">
                            <i class="fas fa-eye"></i> <span>{events.visualizacoes + 1}</span>
                        </div>

                        <h3 className="mx-auto mt-5 titulo"><strong>{events.titulo}</strong></h3>
                    </div>

                    <div className="row mt-5 d-flex justify-content-around">
                        <div className="col-md-3 col-sm-12 box-info p-3 my2">
                            <i className="fas fa-ticket-alt fa-2x"></i>
                            <h5><strong>Tipo</strong></h5>
                            <span className="mt-3">{events.tipo}</span>
                        </div>

                        <div className="col-md-3 col-sm-12 box-info p-3 my2">
                            <i className="fas fa-calendar-alt fa-2x"></i>
                            <h5><strong>Data</strong></h5>
                            <span className="mt-3">{events.data}</span>
                        </div>

                        <div className="col-md-3 col-sm-12 box-info p-3 my2">
                            <i className="fas fa-clock fa-2x"></i>
                            <h5><strong>Hora</strong></h5>
                            <span className="mt-3">{events.hora}</span>
                        </div>
                    </div>

                    <div className="row box-details mt-5">
                        <div className="col-12 text-center">
                            <h5><strong>Detalhes do Evento</strong></h5>
                        </div>

                        <div className="col-12 text-center">
                            <p>{events.detalhes}</p>
                        </div>
                    </div>

                    {user === events.userEmail ? <Link className="btn-edit" to={`/editevent/${props.match.params.id}`}><i className="fas fa-pen-square fa-3x"></i></Link> : ""}
                    {user === events.userEmail ? <button onClick={handleDelete}  type="button" className="btn btn-lg btn-block mt-3 mb-5 btn-register">Remover Evento</button> : ""}
                </div>
            }
        </div>
    </>);
}

export default EventDetails
