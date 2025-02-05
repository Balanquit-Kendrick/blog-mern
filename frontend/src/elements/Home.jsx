import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/constants';

function Home() {
  const [ data, setData ] = useState([])

  useEffect(() =>{
    axios.get(BASE_URL+'/users')
    .then((res)=>{
      setData(res.data)
    }).catch((err)=>console.log(err));
  }, [])

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((user)=>{
              return (
                <tr>
                  <td>{user.id}</td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.email}</td>
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