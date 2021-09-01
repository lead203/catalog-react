import React from 'react'
import {NavLink} from 'react-router-dom'

export const Navbar = ({setLogin}) => {

    const exitUser = () => {
        localStorage.clear('isLogin')
        setLogin(false)
    }

    return (
        <nav className="navbar navbar-dark navbar-expand-lg bg-primary p-4">
            <div className="d-flex justify-content-between container">
                <div className="navbar-brand">
                    Catalog
                </div>

                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/" exact>
                            Главная
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/add_product">
                            Добавить
                        </NavLink>
                    </li>
                </ul>

                <div>
                    <button onClick={exitUser} className="btn btn-dark">Выйти</button>
                </div>
            </div>
        </nav>
    )
}