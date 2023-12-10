import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {AccountService} from './AccountService'
import axios from 'axios';
import Header from '../Header/Register_Login';

export default function Login() {
    let navigate = useNavigate()

    const [credentials, setCredentials] = useState([])
    
    // Gestion de la modification des champs du formulaire
    const onChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(credentials)
        axios.post('http://localhost:3001/login', credentials)
            .then(res => {
                console.log(res)
                AccountService.saveToken(res.data.token)
                navigate('/')
            })
            .catch(error => console.log(error))
    }
    
    return (
        <form className='container my-3' onSubmit={onSubmit}>
            <Header/>
            <h1 className="text-center">
                <b>Login</b>
            </h1>
            <center className="my-5">
                <table>
                    <tr>
                        <td>
                            <b>Email</b>
                        </td>
                        <td><input type="text" name="email" placeholder="exemple@gmail.com" className="my-3" value={credentials.email} onChange={onChange}/></td>
                    </tr>
                    <tr>
                        <td>
                            <b>Password</b>
                        </td>
                        <td>
                            <input type="password" name="password" placeholder="Password" className="my-3" value={credentials.password} onChange={onChange}/>
                            <button className="mx-2 btn btn-primary">Login</button>
                        </td>
                    </tr>
                </table>
            </center>
        </form>
    );
};