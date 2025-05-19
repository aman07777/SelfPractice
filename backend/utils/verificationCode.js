const verificationCode =()=>{
    let code=""
    const char = "123456789QWERTYUIOPLKJHGFDSAMNBVCXZ"

    for(let i=0;i<4;i++){
       code += char.charAt(Math.floor(Math.random()*char.length))
    } 
    return code
}

export default verificationCode
