import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL, USERS_URL } from '../utils/constants';

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
                    <button onClick={()=>handleDeleteUser(user.id)} className='bg-red-600 rounded-lg m-2 p-2 text-white'>Delete</button>
                    <button onClick={()=>handleEditUser(user)} className='bg-blue-600 rounded-lg m-2 p-2 text-white'>Edit</button>
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