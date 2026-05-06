import {useContext,useEffect} from "react"

 
import {login,register,logout, getMe} from "../services/auth.api"  
import { AuthContext } from "../auth.context";

export const useAuth = () => {
    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context

    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        try{
        const data=await login({ email, password })
        setUser(data.user)
        }catch(error){
            console.log("Message:", error); 
        }
        finally{
        setLoading(false)
    }
  }
    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        const data = await register({ username, email, password })
        setUser(data.user)
        setLoading(false)
    }
    const handleLogout = async () => {
        setLoading(true)
        await logout()
        setUser(null)
        setLoading(false)
    }
    const handleGetMe = async () => {
        setLoading(true)
        const data = await getMe()
        setUser(data.user)
        setLoading(false)
    }


    useEffect(() => {
        const getAndSetUser = async()=>{
            try{
                const data = await getMe()
                setUser(data.user)

            }catch(error){
                console.log("Message:", error); 
            }finally{
            
            setLoading(false)}
        }
        getAndSetUser()
    }, [])

    return { user, setUser, loading, setLoading, handleLogin, handleRegister, handleLogout, handleGetMe }
    }  
