import React, { useActionState } from 'react'
import InputField from '../Components/InputField'
import {Link, useNavigate} from "react-router-dom"
import axios from "axios"
const SignUp = () => {
  const initialState={
    username:'',
    email:'',
    password:'',
    error:null
  };
  const navigate=useNavigate()
  const handleLogin=async(previousData,currentFormData)=>{
    try{
      const {username,email,password}=Object.fromEntries(currentFormData);
      const response=await axios.post('http://localhost:8080/api/auth/signup',{username,email,password},{withCredentials:true})
      const data= await response.data;
      console.log(data)
      navigate('/sign-in')
    }catch(error){
      let message=error?.response?.data?.message || error?.message;
      return {...previousData,error:message}
    }
  }
  const [state,actionFun,isPending]=useActionState(handleLogin,initialState)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold'>Sign Up</h1>
      <form action={actionFun} className='flex flex-col gap-4 p-3'>
        <InputField type="text" placeholder="Username ..." name="username"/>
        <InputField type="text" placeholder="Email ..." name="email"/>
        <InputField type="password" placeholder="Password ..." name="password"/>

        <button 
        className='bg-indigo-700 text-white p-3 rounded-lg uppercase hover:opacity-90 transition-all duration-150 disabled:opacity-60' 
        disabled={isPending}>{isPending? 'Checking ...':'Sign up'}</button>
      
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={'/sign-in'}>
          <span className='text-blue-500'>Sign in</span>
        </Link>
        
      </div>

      {state.error && <p className=' mt-6 text-red-500 bg-red-200 p-3'>{state.error}</p>}
    </div>
  )
}

export default SignUp
