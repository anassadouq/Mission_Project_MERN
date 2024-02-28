import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { BiAddToQueue } from 'react-icons/bi';
import './Style.css';

export default function Create() {
    const navigate = useNavigate();

    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [deadline, setDeadline] = useState('');
    const [status, setStatus] = useState('');

    const createMission = (e) => {
        e.preventDefault();

        if (description && priority && deadline && status !== '') {
            Axios.post("http://localhost:3001/create", {
                description,
                priority,
                deadline,
                status,
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
                                <td><b>Priority</b></td>
                                <td>
                                    <input type="checkbox" name="priority" value="High" onChange={(e) => { setPriority(e.target.value) }} className="my-4 mx-2"/>High
                                    <input type="checkbox" name="priority" value="Normal" onChange={(e) => { setPriority(e.target.value) }} className="my-4 mx-2"/>Normal
                                    <input type="checkbox" name="priority" value="Low" onChange={(e) => { setPriority(e.target.value) }} className="my-4 mx-2"/>Low
                                </td>
                            </tr>
                            <tr>
                                <td><b>Deadline</b></td>
                                <td>
                                    <input type="date" name="deadline" onChange={(e) => { setDeadline(e.target.value) }} className="my-4 form-control"/>
                                </td>
                            </tr>
                            <tr>
                                <td><b>Status</b></td>
                                <td>
                                    <input type="checkbox" name="status" value="100" onChange={(e) => { setStatus(e.target.value) }} className="my-4 mx-2"/>100%
                                    <input type="checkbox" name="status" value="75" onChange={(e) => { setStatus(e.target.value) }} className="my-4 mx-2"/>75%
                                    <input type="checkbox" name="status" value="50" onChange={(e) => { setStatus(e.target.value) }} className="my-4 mx-2"/>50%
                                    <input type="checkbox" name="status" value="25" onChange={(e) => { setStatus(e.target.value) }} className="my-4 mx-2"/>25%
                                    <input type="checkbox" name="status" value="0" onChange={(e) => { setStatus(e.target.value) }} className="my-4 mx-2"/>0%
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