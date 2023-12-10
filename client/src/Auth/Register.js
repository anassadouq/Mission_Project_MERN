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
        <div>
            <Header/>
            <h1 className="text-center">
                <b>Register</b>
            </h1>
            <center className="my-5">
                <table>
                    <tr>
                        <td>
                            <b>First Name</b>
                        </td>
                        <td><input type="text" className="my-3" placeholder="First Name" onChange={(e) => setName(e.target.value)}/></td>
                    </tr>
                    <tr>
                        <td>
                            <b>Email</b>
                        </td>
                        <td><input type="email" className="my-3" placeholder="example@gmail.com" onChange={(e) => setEmail(e.target.value)}/></td>
                    </tr>
                    <tr>
                        <td>
                            <b>Password</b>
                        </td>
                        <td><input type="password" className="my-3" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/></td>
                    </tr>
                    <tr>
                        <td>
                            <b>Confirm Password</b>
                        </td>
                        <td><input type="password" className="my-3" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)}/></td>
                        <td><button className="mx-2 btn btn-primary" onClick={register} disabled={isDisabled()}>Register</button></td>
                    </tr>
                </table>
            </center>
        </div>
    );
}