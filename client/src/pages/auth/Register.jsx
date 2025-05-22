
import React,{useState} from "react"
import axios from 'axios'
import {  toast } from 'react-toastify';


const Register = () => {

  const [form,setForm] = useState({
    email:'',
    password:'',
    confirmPassword:''
  })

const handleOnChange =(e)=>{
  setForm({
    ...form,
    [e.target.name]:e.target.value
  })
}
const handleSubmit = async(e)=>{
  e.preventDefault()

  if(form.password !== form.confirmPassword){
    return alert('ConfirmPassword is not match')
  }

  console.log(form)
  //send to back 
  try{
    //code
    const res = await axios.post('http://localhost:5000/api/register',form)
    console.log(res)
    toast.success(res.data)
  }catch(err){
    const errMsg = err.response?.data?.message
    toast.error(errMsg)
    console.log(err)
  }
}


  return (
    <div>
      Registers
      <form onSubmit={handleSubmit}>
        Email:
        <input className="border"
        name="email"
        type="email"
        onChange={handleOnChange}
        />

        Password:
        <input className="border" 
        name="password"
        type="text"
        onChange={handleOnChange}
        />
         Confirm Password:
        <input className="border" 
        name="confirmPassword"
        type="text"
        onChange={handleOnChange}
        />

        <button className="bg-blue-500">Register</button>

      </form>
    </div>
  )
}
export default Register