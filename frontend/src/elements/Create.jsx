import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL, USERS_URL } from '../utils/constants'

function Create() {
    const [values, setValues] = useState({
        first_name: '',
        last_name: '',
        email: '',
    })

    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault()
        axios.post(`${USERS_URL}/add_user`, values)
        .then((res)=>{
            console.log('res',res)
            navigate('/')
        })
        .catch((err)=>console.log(err))
    }

  return (
    <div className='max-w-[1200px] mx-auto'>
        <div>
            <button className='bg-blue-600 rounded-lg m-2 py-2 text-white cursor-pointer'>
                <Link to='/'>
                    Home
                </Link>
            </button>
            <h3>Add Users</h3>
            <form action="" onSubmit={handleSubmit}>
                <div className='form-group my-3'>
                    <label htmlFor="first_name">First name </label>
                    <input className="border" type="text" first_name="first_name" onChange={(e)=> setValues({...values, first_name: e.target.value}) }/>
                </div>
                <div className='form-group my-3'>
                    <label htmlFor="last_name">Last name </label>
                    <input className="border" type="text" last_name="last_name" onChange={(e)=> setValues({...values, last_name: e.target.value}) }/>
                </div>
                <div className='form-group my-3'>
                    <label htmlFor="email">Email </label>
                    <input className="border" type="email" name="email" onChange={(e)=> setValues({...values, email: e.target.value}) }/>
                </div>
                <div>
                    <button className="border" type='submit'>Save</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Create