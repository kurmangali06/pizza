import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../componets/Header'

export default function MainLaoyout() {
  return (
    <div className="wrapper">
     <Header />
    <div className="content">
       <Outlet/>
    </div>
  </div>
  )
}
