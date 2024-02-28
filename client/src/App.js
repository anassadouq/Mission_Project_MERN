import React, { Component } from "react"
import Liste from './Components/Liste';
import Create from './Components//Create';
import Update from './Components/Update';

import Login from "./Auth/Login";
import Register from "./Auth/Register";
import AuthGuard from "./Auth/AuthGuard";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default class App extends Component{
    render(){
        return(
            <Router>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register />}/>
                    <Route path="/" element={
                        <AuthGuard>
                            <Liste/>
                        </AuthGuard>
                    }/>

                    <Route path="/create" element={
                        <AuthGuard>
                            <Create/>
                        </AuthGuard>
                    }/>

                    <Route path="/update/:_id" element={
                        <AuthGuard>
                            <Update/>
                        </AuthGuard>
                    }/>                    
                </Routes>
            </Router>
        )
    }
}