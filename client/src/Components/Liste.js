import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { LuEdit } from 'react-icons/lu';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { BiAddToQueue } from 'react-icons/bi';
import Logout from "../Header/Logout";

export default function Liste() {
  const [mission, setMission] = useState([]);

  useEffect(() => {
    fetchMission();
  }, []);

  const fetchMission = async () => {
    await axios.get('http://localhost:3001/missions')
      .then(({ data }) => {
        setMission(data);
      })
      .catch(error => {
        console.error('Error fetching missions:', error);
        // Handle error if needed
      });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-CA');
  };

  const deleteMission = async (_id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this mission?');

    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3001/delete/${_id}`);
        fetchMission();
      } catch (error) {
        console.error('Error deleting mission:', error);
        // Handle error if needed
      }
    }
  };

  // Function to determine the style based on the mission priority
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High':
        return 'btn btn-danger rounded-pill';
      case 'Normal':
        return 'btn btn-primary rounded-pill';
      case 'Low':
        return 'btn btn-success rounded-pill';
      default:
        return '';
    }
  };

  return (
    <div className="container">
      <Logout />
      <Link to='/create'>
        <button className="btn btn-warning my-3"><BiAddToQueue /> Mission</button>
      </Link>
      <table width="100%" className="text-center">
        <tr>
          <th>Description</th>
          <th>Priority</th>
          <th>Deadline</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
        {mission.map((item, _id) => (
          <tr key={_id}>
            <td>{item.description}</td>
            <td>
              <button className={getPriorityClass(item.priority)} style={{ "width": "50%" }}>
                {item.priority}
              </button>
            </td>
            <td>{formatDate(item.deadline)}</td>
            <td>
              <input type="range" min="0" max="100" value={item.status}/>
              <span>{item.status}%</span>
            </td>
            <td>
              <Link to={`/update/${item._id}`} >
                <button className="btn btn-secondary mx-1"><LuEdit /></button>
              </Link>
              <button onClick={() => deleteMission(item._id)} className="btn btn-danger mx-1"><RiDeleteBin5Line /></button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}