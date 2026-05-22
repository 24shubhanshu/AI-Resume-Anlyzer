import { useContext ,useEffect} from "react";
import { AuthContext } from "../auth.context";

import { getme,login,register,logout } from "../services/aut.api";


export const useAuth = () => {

    const context = useContext(AuthContext)

    const { user, setUser, loading, setLoading } = context

    const handleLogin = async ({ email, password }) => {
        setLoading(true)

        try{
            const data = await login({ email, password })

        setUser(data.user)
        }
        catch(err)
        {
            
        }
        finally{
            setLoading(false);
        }
        
    }

    const handleRegister = async ({ username, email, password }) => {

        setLoading(true)

      try{
          const data = await register({
            username,
            email,
            password
        })

        setUser(data.user)
      }
      catch(err)
      {

      }
      finally{
setLoading(false)
      }

        
    }

    const handleLogout = async () => {

        setLoading(true)
       try{
        
        const data = await logout()

        setUser(null)
       }
       catch(err)
       {

       }
       finally{
setLoading(false);
       }

        
    }
useEffect(() => {

    const getandsetUser = async () => {
        try {
            const data = await getme();

            if (data?.user) {
                setUser(data.user);
            }

        } catch (err) {
            console.log(err);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    getandsetUser();

}, []);
    return {
        user,
        loading,
        handleRegister,
        handleLogin,
        handleLogout
    }
}