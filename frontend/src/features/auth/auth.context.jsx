import { createContext, useState } from "react";
import { getme } from "./services/aut.api";

export const AuthContext = createContext();

export const AuthProvider=({children})=>{
const [user,setUser]= useState(null);
const  [loading,setLoading] = useState(true);



return(
    <AuthContext.Provider value={{user,setUser,setLoading,loading}}>
   {children}
    </AuthContext.Provider>
)
}