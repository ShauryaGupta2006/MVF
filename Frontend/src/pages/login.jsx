import { useEffect, useState } from "react";
function Login(){

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    async function handleLogin(e){
        e.preventDefault();
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email,password})
        })
        const data = await res.json();
        if(data.success){
            alert("Login Successful")
            window.location.href = "/"
        }
        else{
            alert("Login Failed")
        }
    }

    return(
        <>
            <form>
                <input type={"text"} value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email"></input>
                <input type={"password"} value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password"></input>
                <button onClick={handleLogin} type="submit">Login</button>
            </form>
        </>
    )
}

export default Login;