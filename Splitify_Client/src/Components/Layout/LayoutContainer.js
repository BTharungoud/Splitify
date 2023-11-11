import React from 'react'
import Navbar from '../Navbar-Homepage/Navbar'

export default function LayoutContainer({children}) {
  return (
    <div>
        <Navbar/>
        <div>
            {children}
        </div>
    </div>
  )
}
