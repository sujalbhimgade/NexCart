import axios from "axios";
import { createContext, useContext, useState } from "react"

const authContext = createContext();

export function ProvideAuth({children}){
    const auth = useProvideAuth();
    return (<authContext.Provider value={auth}>{children}</authContext.Provider>)
}

export const useAuth = () => {
    return useContext(authContext)
}

function useProvideAuth () {
    // const localUser = 
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) )
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    

    function login(loginData){
        setIsLoading(true)
        axios.post("/api/v1/auth/authenticate", loginData)
        .then((res) => {
            localStorage.setItem("token", JSON.stringify(res.data.jwt))
            localStorage.setItem("user", JSON.stringify(res.data.user))

            setUser(res.data.user)
            setIsLoading(false)
            setIsError(false)
        })
        .catch((err) => {
            console.log(err);
            
            console.log(err.response.data);
            setError(err.response.data)
            setIsLoading(false)
            setIsError(true)

            
        })
    }

    function signUp(signUpData){
        setIsLoading(true)
        axios.post("/api/v1/auth/register", signUpData)
        .then((res) => {
            console.log("Token: "+res.data.jwt);
            localStorage.setItem("token", JSON.stringify(res.data.jwt))
            localStorage.setItem("user", JSON.stringify(res.data.user))

            setIsLoading(false)
            setUser(res.data)
            setIsError(false)

        })
        .catch((err) => {
            console.log("Err "+err);
            setError(err.response.data)
            setIsLoading(false)
            setIsError(true)

            
        })
    }

    function updateUser(data) {
        setUser(data)
        localStorage.setItem("user", JSON.stringify(data))
        
    }

    function logOut(){
        setUser(null)
        localStorage.removeItem("user")
        localStorage.removeItem("token")
    }



    return {
        isError,
        user,
        login,
        signUp,
        error,
        isLoading,
        logOut,
        updateUser
    }
}