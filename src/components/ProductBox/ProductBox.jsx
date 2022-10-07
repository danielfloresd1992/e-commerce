import car from '../../../public/car.svg';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { getProductCar, setProductCar } from '../../store/slices/card';
import axios from 'axios';
import getConfig from '../../../public/utils/config';

export const ProductBox = ({ products }) => {

    let [ img, setImg ] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const addCard = (data) => {
        if(localStorage.getItem('token')){
            axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/cart', data , getConfig())
            .then(results => {
                dispatch(getProductCar());
            })
            .catch(err => console.log(err));
        }
        else{
            navigate('/login');
        }
    };

  
    return(
        <article className='products' key={ products.id } >
            <div className='products-imgContains' onMouseEnter={ () => setImg(img = false) } onClick={ () => navigate(`/product/${products.id}`) }
                onMouseLeave={ () => setImg(img = true) } >
                <img className='products-img' src={ img ? products.productImgs[0] : products.productImgs[1]} alt=""/>
            </div>
            <div className='products-data'>
                <h3 className='products-title'>{ products.title }</h3>
                <p className='products-price' >Price:</p>
                <h4 className='products-price' >$ { products.price }</h4>
            </div>
            <button className='products-car' style={{zIndex: 40 }}  onClick={() => addCard({id: products.id , quantity: 1}) }>
                <img className='products-car-img' src={ car } alt="" onC/>
            </button>
        </article>
    );
}