import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { LuEdit } from 'react-icons/lu';

export default function Update() {
    const navigate = useNavigate();
    const { _id } = useParams();
    const [formattedDate, setFormattedDate] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [deadline, setDeadline] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        fetchMission();
    }, []);
    
    const fetchMission = async () => {
        try {
            const response = await axios.patch(`http://localhost:3001/update/${_id}`);
            const { description, priority, deadline, status } = response.data.mission;

            // Formatage de la date
            const formattedDeadline = deadline.slice(0, 10);

            setDescription(description);
            setPriority(priority);
            setFormattedDate(formattedDeadline);
            setDeadline(formattedDeadline); // Assignation au format ISO pour envoi PATCH
            setStatus(status);
        } catch (error) {
            console.error('Error fetching mission:', error);
        }
    };
    

    const updateMission = async (e) => {
        e.preventDefault();

        try {
            await axios.patch(`http://localhost:3001/update/${_id}`, {
                description,
                priority,
                deadline,
                status,
            });
            navigate('/');
        } catch (error) {
            console.error('Error updating mission:', error);
        }
    };

    return (
        <div className="center-container">
            <form onSubmit={updateMission} className="custom-form">
                <table>
                    <tbody>
                        <tr>
                            <td><b>Description</b></td>
                            <td>
                                <textarea name="description" cols="60" rows="3" className="my-4" value={description} onChange={(e) => { setDescription(e.target.value) }}></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td><b>Priority</b></td>
                            <td>
                                <input type="checkbox" name="priority" value="High" onChange={(e) => { setPriority(e.target.value) }} className="my-4 mx-2" checked={priority === "High"}/>High
                                <input type="checkbox" name="priority" value="Normal" onChange={(e) => { setPriority(e.target.value) }} className="my-4 mx-2" checked={priority === "Normal"}/>Normal
                                <input type="checkbox" name="priority" value="Low" onChange={(e) => { setPriority(e.target.value) }} className="my-4 mx-2" checked={priority === "Low"}/>Low
                                </td>
                        </tr>
                        <tr>
                            <td><b>Deadline</b></td>
                            <td>
                                <input type="date" name="deadline" value={deadline} onChange={(e) => { setDeadline(e.target.value) }} className="my-4 form-control"/>
                            </td>
                        </tr>
                        <tr>
                            <td><b>Status</b></td>
                            <td>
                                <input type="radio" name="status" value="100" onChange={(e) => { setStatus(e.target.value) }} className="my-4 mx-1" checked={status === "100"}/>100%
                                <input type="radio" name="status" value="75" onChange={(e) => { setStatus(e.target.value) }} className="my-4 mx-1" checked={status === "75"}/>75%
                                <input type="radio" name="status" value="50" onChange={(e) => { setStatus(e.target.value) }} className="my-4 mx-1" checked={status === "50"}/>50%
                                <input type="radio" name="status" value="25" onChange={(e) => { setStatus(e.target.value) }} className="my-4 mx-1" checked={status === "25"}/>25%
                                <input type="radio" name="status" value="0" onChange={(e) => { setStatus(e.target.value) }} className="my-4 mx-1" checked={status === "0"}/>0%
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <button className="form-control btn btn-secondary">
                                    <LuEdit /> Update
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}