import React, { Children } from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Register from './components/Register.jsx'
import Login from "./components/Login.jsx"
import Dashboard from './components/Dashboard.jsx'
import Log from "./components/Log.jsx"
import Consumption from "./components/consumption.jsx"
import MainPage from './components/mainPage.jsx'
import Profile from "./components/profile.jsx"
import {createBrowserRouter , RouterProvider} from "react-router-dom"
import ProtectedRoute from './components/protectedRoutes.jsx'
import { Navigate } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import Blog from './components/Blog.jsx'
import About from './components/About.jsx'
const Router = createBrowserRouter([
  {
    path:"/",
    element:
    <App />

  },{
    path:"/register",
    element:<Register/>
  }
  ,{
    path:"/login",
    element:<Login/>
  },
  {
    path:"/blog",
    element:<Blog/>
  },
  {
    path:"/about",
    element:<About/>
  },
 {
  path:"/Dashboard",
  element: <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>,
  children:[
     { index: true, element: <Navigate to="mainpage" replace /> },
     { path: "mainpage", element: <MainPage /> },
    {path:"Log" , element:<Log/>},
    {path:"consumption" , element:<Consumption/>},
    {path:"profile" , element:<Profile/>}
  ]
 }

  
])

createRoot(document.getElementById('root')).render(
 
   
  <Provider store={store}>
      <RouterProvider router={Router} />
    </Provider>
  
 
)
