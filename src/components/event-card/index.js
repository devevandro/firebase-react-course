import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../config/firebase';
import './eventCard.css';

function EventCard({key, id, img, titulo, detalhes, visualizacoes}) {
    const [urlImage, setUrlImage] = useState('');

    useEffect(() => {
        firebase.storage().ref(`images/${img}`).getDownloadURL().then(url => {
            setUrlImage(url);
        });
    }, [urlImage]);

    return (<>
        <div className="col-md-3 col-sm-12">
            <img src={urlImage} className="card-img-top img-card" alt="Imagem do Evento" />

            <div className="card-body">
                <h5>{titulo}</h5>
                <p className="card-text text-justify">{detalhes}</p>

                <div className="row footer-card d-flex aling-items-center">
                    <div className="col-6">
                        <Link className="btn btn-sm btn-details" to={"/eventsdetails/" + id}>+ detalhes</Link>
                    </div>

                    <div className="col-6 text-right">
                        <i class="fas fa-eye"></i> <span>{visualizacoes}</span>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default EventCard;
