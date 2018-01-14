import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

// Components:
import Login from './components/views/public/Login'
import Signup from './components/views/public/Signup'
import Home from './components/views/Home/Home'

const token = localStorage.getItem('token')

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                </header>

                {/* Routers here: */}
                <BrowserRouter>
                    <Switch>
                        <Route path="/home" render={
                            (props) => {
                                if (token) {
                                    return <Home {...props} /> 
                                } else {
                                    return <Redirect to="/"/>
                                }
                            }
                        }></Route>
                        <Route path="/signup" component={Signup}></Route>
                        <Route path="/" component={Login}></Route>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App
