import './style.css';
import deleteImg from '../../../public/deletesvg.svg';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductCar } from '../../store/slices/card';
import { key } from 'localforage';
import axios from 'axios';
import getConfig from '../../../public/utils/config';

function AsideCard({ isVisibility, update }) {

    const dispatch = useDispatch()
    const productCars = useSelector(state => state.cardProduct);

    useEffect(() => {
        dispatch(getProductCar());
    }, [update])
    const freshProduct = () => {
        dispatch(getProductCar());
    }
    const deleteProduct = (id) => {
        axios.delete(`https://ecommerce-api-react.herokuapp.com/api/v1/cart/${id}`, getConfig())
        .then(result => {
            //freshProduct();
             dispatch(getProductCar());
        })
    }
    const cardPurchases = () => {
        const body = {
            "street": "Green St. 1456",
            "colony": "Southwest",
            "zipCode": 12345,
            "city": "USA",
            "references": "Some references"
        }
        axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/purchases',body, getConfig())
        .then(results => {
            console.log(results);
            dispatch(getProductCar());
        })
        .catch(err => console.log(err))
    };
    console.log(productCars);

    return (
        <div className='asideCard-component' style={ isVisibility ? { visibility: 'visible' }: { visibility: 'hidden' } } key='hola'> 
            <h3 className='asideCard-title'>shopping cart</h3>
            <div className='asideCart-ProductContain' >
                {
                    productCars.map(target => (
                        <article className='asideCart-product' key={target.key}>
                            <p className='asideCart-brand' >{target.brand}</p>
                        <h4 className='asideCart-title' >{target.title}</h4>
                        <div className='asideCart-cuantityContain'>
                                <p className='asideCart-cuantity'>{target.productsInCart.quantity}</p>
                        </div>
                        <button className='boxContainer_form-btn asideCart-btnDelect' onClick={() => deleteProduct(target.id)}>
                                <img className='asideCart-btnImg' src={ deleteImg } alt="" />
                        </button>
                        </article>
                    ))
                }
            </div>
            <button className='boxContainer_form-btn asideCart-btnBuy' onClick={ cardPurchases } >CheckOut</button>
        </div>
    );
}


export default AsideCard;