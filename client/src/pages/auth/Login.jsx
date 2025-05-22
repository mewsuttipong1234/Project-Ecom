
import React,{useState} from "react"
import axios from 'axios'
import {  toast } from 'react-toastify';
import useEcomStore from "../../store/ecom-store";
import { useNavigate } from "react-router-dom";


const Login = () => {

  const actionLogin = useEcomStore((state)=>state.actionLogin)
  const user = useEcomStore((state)=>state.user)
const navigate =useNavigate()


  const [form,setForm] = useState({
    email:'',
    password:'',
  })

const handleOnChange =(e)=>{
  setForm({
    ...form,
    [e.target.name]:e.target.value
  })
}
const handleSubmit = async(e)=>{
  e.preventDefault()
  //send to back 
  try{
   const res = await actionLogin(form)
  const role = res.data.payload.role
    roleRedirect(role)
   console.log('res->',role)
   toast.success('Welcome')
  }catch(err){
    console.log(err)
    const errMsg = err.response?.data?.message
    toast.error(errMsg)
  }
}
const roleRedirect =(role)=>{
  if(role === 'admin'){
    navigate('/admin')
  }else{
    navigate('/')
    
  }
}

  return (
    <div>
      Login
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
 

        <button className="bg-blue-500">Login</button>

      </form>
    </div>
  )
}
export default Login