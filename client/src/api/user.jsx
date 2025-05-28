import axios from "axios";


export const creatUserCart = async (token,cart)=>{
    return axios.post('http://localhost:5000/api/user/cart',cart,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
}