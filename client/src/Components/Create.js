import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { BiAddToQueue } from 'react-icons/bi';
import './Style.css';

export default function Create() {
    const navigate = useNavigate();

    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [isCompleted, setIsCompleted] = useState('');

    const createMission = (e) => {
        e.preventDefault();

        if (description && deadline && isCompleted !== '') {
            Axios.post("http://localhost:3001/create", {
                description,
                deadline,
                isCompleted,
            }).then((res) => {
                navigate("/");
            }).catch(error => {
                console.error("Error creating mission:", error);
            });
        }
    };

    return (
        <center>
            <div className="center-container">
                <form onSubmit={createMission} className="custom-form">
                    <table>
                        <tbody>
                            <tr>
                                <td><b>Description</b></td>
                                <td>
                                    <textarea name="description" placeholder="Description" cols="60" rows="3" className="my-4" onChange={(e) => { setDescription(e.target.value) }}></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td><b>Deadline</b></td>
                                <td>
                                    <input type="date" name="deadline" onChange={(e) => { setDeadline(e.target.value) }} className="my-4 form-control"/>
                                </td>
                            </tr>
                            <tr>
                                <td><b>Is_Completed</b></td>
                                <td>
                                    <input type="radio" name="isCompleted" onChange={() => { setIsCompleted("yes") }} className="my-4 mx-1"/>Yes
                                    <input type="radio" name="isCompleted" onChange={() => { setIsCompleted("no") }} className="my-4 mx-1"/>No
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <button className="form-control btn btn-warning"><BiAddToQueue /> Mission</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </center>
    )
}