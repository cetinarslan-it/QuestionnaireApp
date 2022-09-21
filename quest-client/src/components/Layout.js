import React from 'react'
import { Outlet, useNavigate } from 'react-router'
import useStateContext from '../hooks/useStateContext'

export default function Layout() {
    const { resetContext } = useStateContext()
    const navigate = useNavigate()

    const logout = () => {
        resetContext()
        navigate("/")
    }

    return (
        <>
            <div className="navbar-container">
                <h3  className="navbar-container__title">Questionnaire App</h3>
                <button className="navbar-container__button" onClick={logout}>Logout</button>
            </div>
            <div>
                <Outlet />
            </div>
        </>
    )
}
