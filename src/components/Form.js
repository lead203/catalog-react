import React, {useState, useContext} from 'react'
import {FirebaseContext} from '../context/firebase/firebaseContext'
import {initializeApp} from "firebase/app";

export const Form = ({product}) => {
    const firebaseConfig = {
        apiKey: "AIzaSyDOsRDbSf9ntyl1MQNi03P8nFydERMvtIk",
        authDomain: "catalog-59c34.firebaseapp.com",
        databaseURL: "https://catalog-59c34-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "catalog-59c34",
        storageBucket: "catalog-59c34.appspot.com",
        messagingSenderId: "1043567143377",
        appId: "1:1043567143377:web:7ab4e7518faf59686558f0"
    };
      
    const app = initializeApp(firebaseConfig);

    const defaultState = {
        title: '',
        description: '',
        price: '',
        discount: '',
        file: '',
        date: ''
    }
    const [value, setValue] = useState(product ? product[0] : defaultState)
    const [errorInput, setErrorInput] = useState(defaultState)
    const [flagBlur, setFlagBlur] = useState(defaultState)

    const firebase = useContext(FirebaseContext)

    const regPrice = new RegExp(/^[0-9]*[.]?[0-9]+$/);
    const regTitle = new RegExp(/^.{20,60}$/);

    function saveFiles(files) {
        
        // let storageRef = app.storage().ref(`images/${files.name}`)
        // let upload = storageRef.put(files)
        // upload.on(app.storage.TaskEvent.STATE_CHANGED, () => {
        //     console.log(upload.snapshot.downloadURL)
        // })
    }

    function checkInput(target) {
        switch (target.name) {
            case 'title':
                setValue({...value, title: target.value })
                if(regTitle.test(target.value)) {
                    setErrorInput({...errorInput, title: ''})
                    console.log('no error')
                } else {
                    console.log('error')
                    setErrorInput({...errorInput, title: 'Введите название 20-60 символов!'})
                }
                break
            case 'price':
                setValue({...value, price: target.value })
                if(regPrice.test(target.value)) {
                    setErrorInput({...errorInput, price: ''})
                } else {
                    setErrorInput({...errorInput, price: 'Введите цифры!'})
                }
                break
            case 'discount':
                setValue({...value, discount: target.value })
                if(regPrice.test(target.value) || target.value === '') {
                    setErrorInput({...errorInput, discount: ''})
                } else {
                    setErrorInput({...errorInput, discount: 'Введите цифры!'})
                }
                break
            case 'date':
                setValue({...value, date: target.value })
                const d = new Date()
                if(formatDate(d) < target.value) {
                    setErrorInput({...errorInput, date: ''})
                } else {
                    setErrorInput({...errorInput, date: 'Дата должна быть больше текущей!'})
                }
                break
            // default:
        }
    }

    function checkBlur(target) {
        switch (target.name) {
            case 'title':
                setFlagBlur({...flagBlur, title: true})
                break
            case 'price':
                setFlagBlur({...flagBlur, price: true})
                break
            case 'discount':
                setFlagBlur({...flagBlur, discount: true})
                break
        }
    }

    const submitHandled = event => {
        event.preventDefault()
        if(!errorInput.title && !errorInput.price && (value.discount && (!errorInput.discount && !!value.date) || value.discound === '')) {
            if(value.id) {
                firebase.editProduct(value.id, value).then(() => {
                    console.log('Edit Success')
                }).catch(() => {
                    console.log('Edit Error')
                })
            } else {
                firebase.addProduct(value).then(() => {
                    console.log('Add Success')
                }).catch(() => {
                    console.log('Add Error')
                })
            }
            
            setValue({
                title: '',
                description: '',
                price: '',
                discound: '',
            })
        }
    }

    const formatDate = (date) => {

        var dd = date.getDate();
        if (dd < 10) dd = '0' + dd;
      
        var mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;
      
        var yy = date.getFullYear() % 100;
        if (yy < 10) {
            yy = '0' + yy;
        } else {
            yy = '20' + yy
        }
      
        return yy + '-' + mm + '-' + dd;
    }
      

    return (
        <form onSubmit={submitHandled}>
            <div className="row mb-3">
                <label className="col-sm-2 col-form-label">Заголовок</label>
                <div className="col-sm-10">
                    <input
                        type="text"
                        name="title"
                        className={`form-control ${(errorInput.title && flagBlur.title && 'is-invalid') || (flagBlur.title && !errorInput.title && 'is-valid')}`}
                        onBlur={e => checkBlur(e.target)}
                        required
                        value={value.title}
                        onChange={e => checkInput(e.target)}
                    />
                    {errorInput.title && <div className="invalid-feedback">
                        {errorInput.title}
                    </div>}
                </div>
            </div>
            <div className="row mb-3">
                <label className="col-sm-2 col-form-label">Картинка</label>
                <div className="col-sm-10">
                    <input
                        type="file"
                        className="form-control-file"
                        value={value.file}
                        onChange={e => saveFiles(e.target.files[0])}
                    />
                </div>
            </div>
            <div className="row mb-3">
                <label className="col-sm-2 col-form-label">Описание</label>
                <div className="col-sm-10">
                    <div className="form-floating">
                        <textarea
                            className="form-control"
                            maxLength="200"
                            style={{height: 100+'px'}}
                            value={value.description}
                            onChange={e => setValue({...value, description: e.target.value})}
                        ></textarea>
                    </div>
                </div>
            </div>
            <div className="row mb-3">
                <label className="col-sm-2 col-form-label">Цена</label>
                <div className="col-sm-10">
                    <div className="input-group">
                        <input
                            type="text"
                            name="price"
                            onBlur={e => checkBlur(e.target)}
                            className={`form-control ${(errorInput.price && flagBlur.price && 'is-invalid') || (flagBlur.price && !errorInput.price && 'is-valid')}`}
                            value={value.price}
                            required
                            onChange={e => checkInput(e.target)}
                        />
                        {errorInput.price && <div className="invalid-feedback">
                            {errorInput.price}
                        </div>}
                    </div>
                </div>
            </div>
            <div className="row mb-3">
                <label className="col-sm-2 col-form-label">Скидка</label>
                <div className="col-sm-10">
                    <div className="input-group">
                        <input
                            type="text"
                            name="discount"
                            disabled={value.price ? false : true}
                            onBlur={e => checkBlur(e.target)}
                            className={`form-control ${value.discount && ((errorInput.discount && flagBlur.discount && 'is-invalid') || (flagBlur.discount && !errorInput.discount && 'is-valid'))}`}
                            value={value.discount}
                            onChange={e => checkInput(e.target)}
                        />
                        {errorInput.discount && <div className="invalid-feedback">
                            {errorInput.discount}
                        </div>}
                    </div>
                </div>
            </div>
            <div className="row mb-3">
                <label className="col-sm-2 col-form-label">Скидка до</label>
                <div className="col-sm-10">
                    <div className="input-group">
                        <input
                            type="date"
                            name="date"
                            disabled={value.discount ? false : true}
                            onBlur={e => checkBlur(e.target)}
                            className={`form-control ${(errorInput.date && flagBlur.date && 'is-invalid') || (flagBlur.discount && !errorInput.discount && 'is-valid')}`}
                            value={value.date}
                            onChange={e => checkInput(e.target)}
                        />
                        {errorInput.date && <div className="invalid-feedback">
                            {errorInput.date}
                        </div>}
                    </div>
                </div>
            </div>
            
            <button type="submit" className="btn btn-primary">Добавить</button>
        </form>
    )
}