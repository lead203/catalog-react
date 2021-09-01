import {ADD_PRODUCT, FETCH_PRODUCT, REMOVE_PRODUCT, SHOW_LOADER, EDIT_PRODUCT, LOGIN} from '../types'

const handlers = {
    [SHOW_LOADER]: state => ({...state, loading: true}),
    [ADD_PRODUCT]: (state, {payload}) => ({
        ...state,
        products: [...state.products, payload]
    }),
    [FETCH_PRODUCT]: (state, {payload}) => ({...state, products: payload, loading: false}),
    [REMOVE_PRODUCT]: (state, {payload}) => ({
        ...state,
        products: state.products.filter(product => product.id !== payload)
    }),
    [EDIT_PRODUCT]: (state, {payload}) => ({
        ...state,
        products: state.products.filter(product => product.id !== payload)
    }),
    [LOGIN]: state => ({
        ...state,
        isLogin: true
    }),
    DEFAULT: state => ({...state, loading: false})
}

export const firebaseReduser = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
} 