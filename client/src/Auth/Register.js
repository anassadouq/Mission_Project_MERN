import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Header from "../Header/Register_Login";

export default function Register() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const register = () => {
        if (name && email && password && confirmPassword){
            Axios.post("http://localhost:3001/register", {
                name,email,password,confirmPassword,
            }).then((res) => {
                setUsers((prevUsers) => [...prevUsers, res.data]);
            });
            navigate("/login");
        }
    };
    const isDisabled = () => {
        return !(name && email && password && confirmPassword);
    };

    return (
        <div className="container my-3">
            <Header/>
            <div className="my-4 card mx-auto" style={{ maxWidth: '600px' }}>
                <div className="card-body">
                    <h1 className="text-center">Register</h1>
                    <div className="form-group">
                        <b>First Name</b>
                        <input type="text" className="form-control my-3" placeholder="First Name" onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <b>Email</b>
                        <input type="email" className="form-control my-3" placeholder="example@gmail.com" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <b>Password</b>
                        <input type="password" className="form-control my-3" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <b>Confirm Password</b>
                        <input type="password" className="form-control my-3" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)}/>
                    </div>  
                    <div className="form-group"> 
                        <button className="form-control btn btn-dark btn-block" onClick={register} disabled={isDisabled()}>Register</button>
                    </div>
                </div>
            </div>
        </div>
    );
}