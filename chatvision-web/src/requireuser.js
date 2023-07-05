import React from 'react'
import { Outlet,Navigate } from 'react-router-dom';


function RequireUser() {
    const user = localStorage.getItem("KEY_ACCESS_TOKEN");
  return (
    user?<Outlet/>:<Navigate to="/login"/>
  )
}

export default RequireUser