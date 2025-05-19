import React from "react"
import {userForm} from "react-hook-form"
import axios from "axios"
const App =()=>{
  
  const {register,handleSubmit} = userForm({
    defaultValues:{
      email:"",
      password:""

    }

    // const onSubmit =()=>{
    //   axios.post
    
    // }
  })
 return (
  <form onSubmit={handleSubmit(onSubmit)}>
    <input type="email" {...register(email),required}/>
    <input type="password" {...register(password),required}/>
    <button type="submit">Submit</button>
  </form>
 )
  
}

export default App