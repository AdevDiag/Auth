import React, { useActionState } from 'react'
import InputField from '../Components/InputField'
import {Link, useNavigate} from "react-router-dom"
import axios from "axios"
const SignIn = () => {
  const initialState={
    email:'',
    password:'',
    error:null
  };
  const navigate=useNavigate()
  const handleLogin=async(previousData,currentFormData)=>{
    try{
      const {email,password}=Object.fromEntries(currentFormData);
      const response=await axios.post('http://localhost:8080/api/auth/signin',{email,password},{withCredentials:true})
      const data= await response.data;
      console.log(data)
      navigate('/')

    }catch(error){
      let message=error?.response?.data?.message || error?.message;
      return {...previousData,error:message}
    }
  }
  const [state,actionFun,isPending]=useActionState(handleLogin,initialState)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold'>Sign In</h1>
      <form action={actionFun} className='flex flex-col gap-4 p-3'>
        <InputField type="text" placeholder="Email ..." name="email"/>
        <InputField type="password" placeholder="Password ..." name="password"/>

        <button 
        className='bg-indigo-700 text-white p-3 rounded-lg uppercase hover:opacity-90 transition-all duration-150 disabled:opacity-60' 
        disabled={isPending}>{isPending? 'Checking ...':'Sign in'}</button>
      
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Don't have an account?</p>
        <Link to={'/sign-up'}>
          <span className='text-blue-500'>Sign up</span>
        </Link>
        
      </div>

      {state.error && <p className=' mt-6 text-red-500 bg-red-200 p-3'>{state.error}</p>}
    </div>
  )
}

export default SignIn
