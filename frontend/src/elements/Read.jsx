import React, { useState, useEffect } from 'react'
import { USERS_URL } from '../utils/constants'
import axios from 'axios'
import { useParams } from 'react-router-dom'


const Read = () => {
  const [data, setData] = useState([])
  const { id } = useParams();
  useEffect(() => {
    axios.get(`${USERS_URL}/get_user/${id}`)
      .then((res)=>{
        setData(res.data)
      })
      .catch((err)=>console.log(err))
      }, [id])
  return (
    <div>
      <h1>User {id}</h1>
      {data.map((student)=>{
        return (
          <div key={student.id}>
            <p>First Name: {student.firstname}</p>
            <p>Last Name: {student.lastname}</p>
            <p>Email: {student.email}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Read