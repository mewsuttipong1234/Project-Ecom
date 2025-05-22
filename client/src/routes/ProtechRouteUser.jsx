import { useState, useEffect } from "react"
import useEcomStore from "../store/ecom-store"
import {currentUser,currentAdmin} from "../api/auth"
import LoadingToredirect from "./LoadingToredirect"




const ProtechRouteUser = ({element}) => {
    
    const [ok , setOk]  = useState(false)
    const user = useEcomStore((state)=>state.user)
    const token = useEcomStore((state)=>state.token)

    useEffect(()=>{
        if(user && token){
            //send to back
            currentUser(token)
            .then((res)=> setOk(true))
            .catch((err)=> setOk(false))
        }
    },[])

  return ok ?  element : <LoadingToredirect/>
}
export default ProtechRouteUser