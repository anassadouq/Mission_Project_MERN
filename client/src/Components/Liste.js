import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { LuEdit } from 'react-icons/lu';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { BiAddToQueue } from 'react-icons/bi';

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

  // Deadline : "YYYY/MM/DD"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-CA'); // Anglais Canada
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

  return (
    <div className="container">
      <Link to='/create'>
        <button className="btn btn-warning my-3"><BiAddToQueue/> Mission</button>
      </Link>
      <table width="100%" className="text-center">
        <tr>
          <th>Description</th>
          <th>Deadline</th>
          <th>Completed</th>
          <th>Actions</th>
        </tr>
        {mission.map((item, _id) => (
          <tr key={_id}>
            <td>{item.description}</td>
            <td>{formatDate(item.deadline)}</td>
            <td>
              {item.isCompleted === 'yes' ? (
                <b><span className="text-success">Yes</span></b>
              ) : (
                <b><span className="text-danger">No</span></b>
              )}
            </td>
            <td>
              <Link to={`/update/${item._id}`} >
                <button className="btn btn-secondary mx-1"><LuEdit/> Update</button>
              </Link>                  
              <button onClick={() => deleteMission(item._id)} className="btn btn-danger mx-1"><RiDeleteBin5Line/> Delete</button>
            </td>       
          </tr>
        ))}
      </table>  
    </div> 
  );
}