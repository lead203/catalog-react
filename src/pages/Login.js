import React, {useContext, useState} from 'react'

import {FirebaseContext} from '../context/firebase/firebaseContext'

export const Login = ({setLogin}) => {
    const {fetchUser} = useContext(FirebaseContext)

    const [value, setValue] = useState({
        login: '',
        password: ''
    })

    const onLogin = (e) => {
        e.preventDefault()

        if(value.login && value.password) 
        fetchUser({...value}).then(resault => {
            if(resault[0]) {
                localStorage.setItem('isLogin', true)
                setLogin(true)
            }
        })
    }

    return (
        <div className="container" style={{maxWidth: 320+'px'}}>
            <form onSubmit={e => onLogin(e)}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Логин</label>
                    <input
                        onChange={e => setValue({...value, login: e.target.value})}
                        value={value.login}
                        type="text"
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Пароль</label>
                    <input
                        onChange={e => setValue({...value, password: e.target.value})}
                        value={value.password}
                        type="password"
                        className="form-control"
                        required
                    />
                </div>
                
                <button type="submit" className="btn btn-primary">Войти</button>
            </form>
        </div>
    )
}