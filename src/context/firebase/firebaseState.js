import React, {useReducer} from 'react'
import axios from 'axios'
import {FirebaseContext} from './firebaseContext'
import {firebaseReduser} from './firebaseResucer'
import {ADD_PRODUCT, FETCH_PRODUCT, REMOVE_PRODUCT, SHOW_LOADER, EDIT_PRODUCT, LOGIN} from '../types'

const url = process.env.REACT_APP_DB_URL

export const FirebaseState = ({children}) => {
    const initialState = {
        products: [],
        loading: false,
    }

    const [state, dispatch] = useReducer(firebaseReduser, initialState)

    const showLoader = () => dispatch({type: SHOW_LOADER})

    const fetchUser = async ({login, password}) => {
        const res = await axios.get(`${url}/users.json`)

        try {
            const result = Object.keys(res.data).map(key => {
                return {
                    ...res.data[key],
                }
            })

            const checkLogin = result.map(user => {
                return user.login === login && user.password === password
            })

            return checkLogin

        } catch(e) {
            console.log(e)
        }
    }

    const fetchProducts = async () => {
        showLoader()
        const res = await axios.get(`${url}/products.json`)

        try {
            const payload = Object.keys(res.data).map(key => {
                return {
                    ...res.data[key],
                    id: key
                }
            })

            dispatch({type: FETCH_PRODUCT, payload})
        } catch(e) {
            dispatch({loading: false})
        }
    }

    const addProduct = async dataProduct => {
        const product = dataProduct

        try {
            const res = await axios.post(`${url}/products.json`, product)
            const payload = {
                ...product,
                id: res.data.name
            }

            dispatch({type: ADD_PRODUCT, payload})
        } catch(e) {
            console.log('Add Error')
        }
    }

    const removeProduct = async id => {
        await axios.delete(`${url}/products/${id}.json`)
        console.log(id)

        dispatch({
            type: REMOVE_PRODUCT,
            payload: id
        })
    }

    const editProduct = async (id, product) => {
        await axios.put(`${url}/products/${id}.json`, product)
        console.log(id)

        dispatch({
            type: EDIT_PRODUCT,
            payload: id
        })
    }

    return (
        <FirebaseContext.Provider value={{
            showLoader, addProduct, removeProduct, fetchProducts, editProduct, fetchUser,
            loading: state.loading,
            products: state.products,
        }}>
            {children}
        </FirebaseContext.Provider>
    )
}