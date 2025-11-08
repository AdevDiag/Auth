import React from 'react'

const InputField = ({type,placeholder,name}) => {
  return (
    <>
    <input type={type} placeholder={placeholder} name={name} className='bg-slate-100 p-3 rounded-lg '/>

    </>
  )
}

export default InputField
