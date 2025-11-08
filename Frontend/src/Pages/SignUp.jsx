import React from 'react'
import InputField from '../Components/InputField'
import {Link} from "react-router-dom"
const SignUp = () => {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold'>Sign Up</h1>
      <form action="" className='flex flex-col gap-4 p-3'>
        <InputField type="text" placeholder="Username ..." name="username"/>
        <InputField type="text" placeholder="Email ..." name="email"/>
        <InputField type="password" placeholder="Password ..." name="password"/>

        <button className='bg-indigo-700 text-white p-3 rounded-lg uppercase hover:opacity-90 transition-all duration-150 disabled:opacity-80' >Sign up</button>
      
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={'/sign-in'}>
          <span className='text-blue-500'>Sign in</span>
        </Link>
        
      </div>
    </div>
  )
}

export default SignUp
