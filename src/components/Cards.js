import React, {useState} from 'react'
import template from '../assets/images/template.png'
import {NavLink} from 'react-router-dom'

export const Cards = ({products, onRemove}) => {
    
    const imgStyle = {
        display: 'flex',
        alignItems: 'center',
        background: 'black'
    };

    const [actualDate, setActualDate] = useState(true)

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
        <div className="row row-cols-1 row-cols-md-2 g-4">
            {console.log(products)}
            {products.map((product, index) => {
                let dateNow = new Date()

                if(formatDate(dateNow) > product.date) {
                    // setActualDate(false)
                    // console.log(product)
                    console.log(formatDate(dateNow) < product.date)
                }

                return (
                    <div className="col" key={index}>
                        <div className="card mb-3" style={{maxWidth: 540+'px'}}>
                            <div className="row g-0">
                                <div className="col-md-4" style={imgStyle}>
                                    <img src={template} className="img-fluid rounded-start" alt="img" />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">{product.title}</h5>
                                        <p className="card-text">{product.description}</p>
                                    </div>
                                    <div className="card">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item">Цена: {product.price}$</li>
                                            {product.discount && <li className="list-group-item">Скидка: {product.discount}%</li>}
                                            {formatDate(dateNow) <= product.date && <li className="list-group-item">Скидка до: {product.date}</li>}
                                        </ul> 
                                    </div>
                                    
                                    <div className="card-body action-btn">
                                        <NavLink to={`/edit/${product.id}`}>
                                            <button type="button" className="btn btn-primary">Edit</button>
                                        </NavLink>
                                        <button onClick={() => onRemove(product.id)} type="button" className="btn btn-danger">&times;</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) 
            })}
        </div>
    )
}