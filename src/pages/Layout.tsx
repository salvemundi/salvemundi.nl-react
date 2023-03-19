import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { NavBar } from '../components/misc/NavBar'
import { Footer } from '../components/misc/Footer'

/**
 * Main page layout.
 * @returns The main page layout.
 */
const Layout = () => {
    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout
