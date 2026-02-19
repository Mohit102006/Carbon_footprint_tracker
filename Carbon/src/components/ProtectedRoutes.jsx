import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { URL } from "../constant";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {

    const get = async() => {

        try {
            const res = await fetch(`${URL}/dashboard`,{
                method:"GET",
                credentials:"include"
            })
            const data = await res.json()
            if(data.success == 1){
                setIsAuth(true)
            }else{
                setIsAuth(false)
            }
        } catch (error) {
            setIsAuth(false)
        }finally{
            setLoading(false)
        }
    }
    get()
  }, []);

  if (loading) return <div>Loading...</div>;

  return isAuth ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
