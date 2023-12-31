import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AccountService } from './AccountService';
import axios from 'axios';
import Header from '../Header/Register_Login';

export default function Login() {
    let navigate = useNavigate();

    const [credentials, setCredentials] = useState({ email: '', password: '' });

    // Gestion de la modification des champs du formulaire
    const onChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/login', credentials)
            .then(res => {
                AccountService.saveToken(res.data.token);
                navigate('/');
            })
            .catch(error => console.log(error));
    };

    return (
        <div className="container my-3">
            <Header />
            <div className="my-4 card mx-auto" style={{ maxWidth: '600px' }}>
                <div className="card-body">
                    <h1 className="card-title text-center">Login</h1>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="email"><b>Email</b></label>
                            <input type="text" name="email" placeholder="exemple@gmail.com" className="form-control my-3" value={credentials.email} onChange={onChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password"><b>Password</b></label>
                            <input type="password" name="password" placeholder="Password" className="form-control my-3" value={credentials.password} onChange={onChange}/>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="form-control btn btn-dark btn-block">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}