import React from 'react'
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom';
import '../index.css'
import { AuthProvider } from './contexts/AuthProvider';
import Routes from './dom/dom-components/body/routes/Routes'
import Navbar from './dom/dom-components/navbar/Navbar';
import SignUp from './login-signUp/SignUp';
import Login from './login-signUp/Login';
import Detail from './dom/dom-components/body/detail/Detail';

const MainComponent = () => {

    return (    
        <Router> 
            <AuthProvider>
                <Switch>
                    <Route exact path='/detail/:id' component={Detail} />
                    <Route exact path='/signup' component={SignUp} />
                    <Route exact path='/login' component={Login} />
                    <React.Fragment>
                        <div className='mainComponent'>
                                <Navbar />
                                <Routes />
                        </div>
                    </React.Fragment>
                </Switch>
            </AuthProvider>
        </Router>
    )
}

export default MainComponent
