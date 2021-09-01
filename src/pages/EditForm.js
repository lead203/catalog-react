import React, {Fragment, useContext} from 'react'

import {Form} from '../components/Form'
import {FirebaseContext} from '../context/firebase/firebaseContext'

export const EditForm = (props) => {
    const id = props.match.params.id
    
    const {products} = useContext(FirebaseContext)
    
    const product = products.filter(prod => prod.id === id)

    return (
        <Fragment>
            <h1>Редактирование</h1>
            <hr/>
            <Form product={product} />
        </Fragment>
    )
}