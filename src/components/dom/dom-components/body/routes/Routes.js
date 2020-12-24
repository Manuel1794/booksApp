import React from 'react'
import { Switch, Route } from 'react-router-dom';
import { Home } from '../home/Home';
import '../home/Home.css' 
import NoMatch from '../NoMatch';
import PrivateRoute from '../../../../login-signUp/PrivateRoute';
import Favs from '../favs/Favs';
import Ajustes from '../ajustes/Ajustes';


const Routes = () => { 
    return (
            <Switch>
                <Route exact path='/ajustes' component={Ajustes} />
                <Route exact path='/favs' component={Favs} />
                <PrivateRoute exact path='/' component={Home} />
                <Route path='*' component={NoMatch}/>
            </Switch>
    ) 
}

export default Routes
