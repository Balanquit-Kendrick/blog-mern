import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL, USERS_URL } from '../utils/constants';
import { Link } from 'react-router-dom';

function Home() {
  const [ data, setData ] = useState([])
  const [ deleted, setDeleted ] = useState(true)
  
  useEffect(() =>{
    if (deleted){
        setDeleted(false);
      axios.get(`${USERS_URL}`)
      .then((res)=>{
        setData(res.data);
      }).catch((err)=>console.log(err));
    }}, [deleted])
        
  const handleDeleteUser = (id) => {
    axios.delete(`${USERS_URL}/delete_user/${id}`, )
    .then((res)=>{
      console.log('User Deleted',res);
      setDeleted(true);
    }).catch((err)=>console.log(err));
  }
  return (
    <div>
      <button className='bg-blue-600 rounded-lg m-2 px-2 py-1 text-white cursor-pointer'>
        <Link to='/create'>
          Add User
        </Link>
      </button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((user)=>{
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.email}</td>
                  <td>
                    <button onClick={()=>handleDeleteUser(user.id)} className='bg-red-600 rounded-lg m-1 px-2 py-1 text-white cursor-pointer'>Delete</button>
                    <Link to={`/read/${user.id}`} className='bg-blue-600 rounded-lg mx-1 my-1 px-2 py-1 text-white cursor-pointer' >
                      Read
                    </Link>
                    <Link to={`/edit/${user.id}`} className='bg-blue-600 rounded-lg mx-1 my-1 px-2 py-1 text-white cursor-pointer'>
                      Edit
                    </Link>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default Home