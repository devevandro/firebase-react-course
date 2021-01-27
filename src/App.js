import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {store, persistor} from '../src/store';
import Login from './view/login';
import NewUser from './view/new-user';
import Home from './view/home';
import UserRecoverPass from './view/user-recover-pass';
import Register from './view/regsiter-eventer';
import EventosDetalhes from './view/event-details';

function App() {

  return (<>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Route exact path='/' component={Home} />
          <Route path='/events/:parametros' component={Home} />
          <Route exact path='/newuser' component={NewUser} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/userrecover' component={UserRecoverPass} />
          <Route exact path='/register' component={Register} />
          <Route path='/eventsdetails/:id' component={EventosDetalhes} />
          <Route path='/editevent/:id' component={Register} />
        </Router>
      </PersistGate>
    </Provider>
  </>);
}

export default App;
