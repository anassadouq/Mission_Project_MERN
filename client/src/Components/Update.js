import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { LuEdit } from 'react-icons/lu';

export default function Update() {
    const navigate = useNavigate();
    const { _id } = useParams();
    const [formattedDate, setFormattedDate] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [isCompleted, setIsCompleted] = useState('');

    useEffect(() => {
        fetchMission();
    }, []);
    
    const fetchMission = async () => {
        try {
            const response = await axios.patch(`http://localhost:3001/update/${_id}`);
            const { description, deadline, isCompleted } = response.data.mission;

            // Formatage de la date
            const formattedDeadline = deadline.slice(0, 10);

            setDescription(description);
            setFormattedDate(formattedDeadline);
            setDeadline(formattedDeadline); // Assignation au format ISO pour envoi PATCH
            setIsCompleted(isCompleted);
        } catch (error) {
            console.error('Error fetching mission:', error);
        }
    };
    

    const updateMission = async (e) => {
        e.preventDefault();

        try {
            await axios.patch(`http://localhost:3001/update/${_id}`, {
                description,
                deadline,
                isCompleted,
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
                            <td><b>Deadline</b></td>
                            <td>
                                <input type="date" name="deadline" value={deadline} onChange={(e) => { setDeadline(e.target.value) }} className="my-4 form-control"/>
                            </td>
                        </tr>
                        <tr>
                            <td><b>Is_Completed</b></td>
                            <td>
                                <input type="radio" name="isCompleted" value="yes" checked={isCompleted === "yes"} onChange={(e) => { setIsCompleted(e.target.value) }}className="my-4 mx-1"/>Yes
                                <input type="radio" name="isCompleted" value="no" checked={isCompleted === "no"} onChange={(e) => { setIsCompleted(e.target.value) }}className="my-4 mx-1"/>No
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