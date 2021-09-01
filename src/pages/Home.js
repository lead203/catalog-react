import React, {Fragment, useContext, useEffect} from 'react'
import {Cards} from '../components/Cards'
import {FirebaseContext} from '../context/firebase/firebaseContext'
import {Loader} from '../components/Loader'

export const Home = () => {
    const {loading, products, fetchProducts, removeProduct} = useContext(FirebaseContext)

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <Fragment>

            {loading
                ? <Loader />
                : ( products.length
                    ? <Cards products={products} onRemove={removeProduct} />
                    : <div className="text-center">Нет данных!</div> )
            }

        </Fragment>
    )
}