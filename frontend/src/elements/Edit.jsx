import React, { useState, useEffect } from 'react'
import { USERS_URL } from '../utils/constants'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'


const Edit = () => {
  const [data, setData] = useState([])
  const { id } = useParams();
  const navigate = useNavigate()
  useEffect(() => {
    axios.get(`${USERS_URL}/get_user/${id}`)
      .then((res)=>{
        setData(res.data)
      })
      .catch((err)=>console.log(err))
      }, [id])

  function handleSubmit(e){
    e.preventDefault()
    axios.post(`${USERS_URL}/edit_user/${id}`, data[0])
    .then((res)=>{
        console.log('res',res)
        navigate('/')
    })
    .catch((err)=>console.log(err))
  }

  return (
    <div>
      <h1>User {id}</h1>
      {data.map((user)=>{
        return (
          <div className='max-w-[1200px] mx-auto' key={id}>
            <div>
                <button className='bg-blue-600 rounded-lg m-2 py-2 text-white cursor-pointer'>
                    <Link to='/'>
                        Back
                    </Link>
                </button>
                <h3>Add Users</h3>
                <form action="" onSubmit={handleSubmit}>
                    <div className='form-group my-3'>
                        <label htmlFor="first_name">First name </label>
                        <input className="border" value={user.firstname} type="text" first_name="first_name" onChange={(e)=> setData([{...data[0], firstname: e.target.value}]) }/>
                    </div>
                    <div className='form-group my-3'>
                        <label htmlFor="last_name">Last name </label>
                        <input className="border" value={user.lastname} type="text" last_name="last_name" onChange={(e)=> setData([{...data[0], lastname: e.target.value}]) }/>
                    </div>
                    <div className='form-group my-3'>
                        <label htmlFor="email">Email </label>
                        <input className="border" value={user.email} type="email" name="email" onChange={(e)=> setData([{...data[0], email: e.target.value}]) }/>
                    </div>
                    <div>
                        <button className="border" type='submit'>Save</button>
                    </div>
                </form>
            </div>
        </div>
        )
      })}
    </div>
  )
}

export default Edit