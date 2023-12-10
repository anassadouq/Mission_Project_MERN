import React from "react";
import { Link } from 'react-router-dom';

export default function Header(){

    return(
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container">
                <a className="text-dark navbar-brand" href="/"></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item dropdown">
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            </ul>
                        </li>
                        <li className="nav-item">
                        </li>
                    </ul>
                    <div className="d-flex">
                        <Link to='/register'>
                            <button className="btn btn-dark ms-3">Register</button>
                        </Link>
                        <Link to='/login'>
                            <button className="btn btn-dark ms-3">Login</button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}