import { useState,useEffect } from 'react'
import {creatCategory,listCategory,removeCategory}  from '../../api/Category'
import useEcomStore from '../../store/ecom-store'
import {  toast } from 'react-toastify';
import { Trash2 } from 'lucide-react';


const FormCategory = () => {

        const token = useEcomStore((state)=>state.token)
        const [name,setName] = useState('')
        // const [categorys , setCategorys] = useState([])
        const categorys =useEcomStore((state)=>state.categorise)
        const getCategory = useEcomStore((state)=>state.getCategory)

        useEffect(()=>{
            getCategory(token)
        },[])




        const handleSubmit = async (e)=>{
            e.preventDefault()
            console.log(token,name)
            if(!name){
                return toast.warning('Please fill data😪')
            }
            try{
                const res = await creatCategory(token,{name})
                console.log(res.data.name)
                toast.success(`Add Category ${res.data.name} success 🎉`)
                getCategory(token)
            }catch(err){
                console.log(err)
            }

        }

        const handleRomove = async(id)=>{
            console.log(id)
            try{
                const res = await removeCategory(token,id)
                console.log(res)
                toast.success(`Delete ${res.data.name} success 🫡`)
                getCategory(token)
            }catch(err){
                console.log(err)
            }
        }

  return (
    <div className='container mx-auto p-4 bg-white shadow-md' >
        <h1>
            Category Management
        </h1>

        <form action="" className='my-4' onSubmit={handleSubmit}>
                <input className='border' type="text"
                onChange={(e)=>setName(e.target.value)}
                />


                <button className='bg-blue-500'>Add Category</button>
        </form>
        <hr />
        <ul className='list-none ' >
            {
                categorys.map((item , index)=>
                    <li className='flex justify-between my-2 bg-gray-100 p-3' key={index}>
                        <span>
                        {item.name}
                        </span>
                        <button 
                        onClick={()=>handleRomove(item.id)}
                        >
                            <Trash2 color="red"/>
                        
                        </button>
                    </li>
                    
                )
               
            }
           
        </ul>
    </div>
  )
}
export default FormCategory