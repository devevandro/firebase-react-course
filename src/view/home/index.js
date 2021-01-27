import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../../components/navBar';
import EventCard from '../../components/event-card';
import { Link } from 'react-router-dom';
import firebase from '../../config/firebase';
import './home.css';

function Home({ match }) {
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState('');
    const usuarioEmail = useSelector(state => state.userEmail);
    let listEvents = [];

    useEffect(() => {
        if (match.params.parametros) {
            firebase.firestore().collection('eventos').where('userEmail', '==', usuarioEmail).get().then(async (result) => {
                await result.docs.forEach(doc => {
                    if (doc.data().titulo.indexOf(search) >= 0) {
                        listEvents.push({
                            id: doc.id,
                            ...doc.data()
                        });
                    }
                })

                setEvents(listEvents);
            });
        } else {
            firebase.firestore().collection('eventos').get().then(async (result) => {
                await result.docs.forEach(doc => {
                    if (doc.data().titulo.indexOf(search) >= 0) {
                        listEvents.push({
                            id: doc.id,
                            ...doc.data()
                        });
                    }
                })

                setEvents(listEvents);
            });
        }
    });

    return (<>
        <NavBar />

        <div className="row p-3">
            <h2 className="mx-auto p-5">Eventos Publicados</h2>
            <input onChange={(e) => setSearch(e.target.value)} type="text" className="form-control text-center" placeholder="Pesquisar..." />
        </div>

        <div className="row p-3">
            {events.map(item =>
                <EventCard key={item.id} id={item.id} img={item.foto} titulo={item.titulo} detalhes={item.detalhes} visualizacoes={item.visualizacoes} />
            )
            }
        </div>
    </>);
};

export default Home;
