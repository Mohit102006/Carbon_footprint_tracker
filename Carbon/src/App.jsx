import React from 'react'
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Card from "./components/Cards"
import Section3 from './components/Section3'
import Footer from './components/Footer'
import "./App.css"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from 'react-router-dom'
// import { UserProvider } from './userContext'; 
const App = () => {

    return (
     
      <>
        <Navbar />
        <Hero />
        <Card />
        <Section3/>
        <Footer/>
        <Outlet />
        <ToastContainer
          position="top-right"
          autoClose={2000}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          pauseOnFocusLoss
        />
      </>
   
    )
}

export default App