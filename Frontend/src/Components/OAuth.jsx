import React from 'react'
import {GoogleAuthProvider, signInWithPopup,getAuth} from "@firebase/auth"
import {app} from '../Firebase'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { loginUser } from '../redux/user/UserSlice'
const OAuth = () => {
    const dispatch=useDispatch()
    const handleGoogleClick=async()=>{
        try{
            const provider=new GoogleAuthProvider();
            const auth=getAuth(app);
            const result= await signInWithPopup(auth,provider)
            const response=await axios.post('http://localhost:8080/api/auth/google',{username:result.user.displayName,email:result.user.email,photoURL:result.user?.photoURL || null});
            const data=await response.data;
            console.log(data)
            dispatch(loginUser(data.user));
        }catch(error){
            console.log(import.meta.env.VITE_FIREBASE_API_KEY)
            console.log("this is error inside OAUTH", error)
        }
    }
  return (
    <button type='button' onClick={handleGoogleClick} className='bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95'>
        Continue with google
    </button>
  )
}

export default OAuth
