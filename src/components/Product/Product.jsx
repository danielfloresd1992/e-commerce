import './style.css';
import car from '../../../public/car.svg';
import { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useNavigate, useParams } from "react-router-dom";
import ImgContent from './ImjPreview';
import { getProductCar, setProductCar } from '../../store/slices/card';
import { useDispatch } from "react-redux";
import getConfig from '../../../public/utils/config';

function Product() {

    const { id } = useParams(); 
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let [ product, setProduct ] = useState({});
    let [ countProduct, setCountProduct ] = useState(1);
    
    const restProduct = () => {
        if(countProduct >  1) setCountProduct(countProduct = countProduct-1);
    };
    const sumProduct = () => {
        setCountProduct(countProduct = countProduct+1);
    };
    const addCard = (data) => {
        if(localStorage.getItem('token')){
            axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/cart', data , getConfig())
            .then(results => {
                console.log(results);
                dispatch(getProductCar());
            })
            .catch(err => console.log(err));
        }
        else{
            navigate('/login');
        }
    };

    useEffect(() => {
        axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/${id}`)
        .then(result => {
            setProduct(result.data.data.product);
            dispatch(getProductCar());
        })
        .catch(err => {
            console.log(err);
        });
    }, []);
    
    return(
    
        <form className="productComponent">
            <article className="product-buyContain">
                <section className="product-phots">
                    <div className="product-titleContent">
                        <h2 className="product-tittle"><Link to="/" >Home</Link>  {product.title}</h2>
                    </div>
                    {
                        product.title ? 
                        (
                            <ImgContent img={product?.productImgs}/>
                        )
                        :
                        (
                            ''
                        )
                    }
                </section>
                <section className="product-descriptions">
                    <div className='product-description-titleContain'>
                        <h3 className='product-description-title'>{product.title}</h3>
                    </div>
                    <div className='product-description-pContain'>
                        <p className='product-description-p'>{product.description}</p>
                    </div>
                    <div className='product-description-buyElementContain' >
                        <h2 className='product-description-title hidden'>{product.title}</h2>
                        <div className='product-description-btn'>
                            <p className='product-description-priceB' >Price: <b>${product.price}</b></p>
                            <div className='product-description-countContain' >
                                <p className='product-description-countTitle'>Quantity</p>
                                <button className='product-description-countBtn' onClick={  restProduct } >-</button>
                                <b className='product-description-countTotal'>{ countProduct }</b>
                                <button className='product-description-countBtn' onClick={  sumProduct } >+</button>
                            </div>
                        </div>
                        <button className='boxContainer_form-btn product-description-btnAction' 
                        onClick={e => {e.preventDefault(); addCard({ id:product.id, quantity: countProduct }) }}> add to car <img className='product-description-btnImg' src={ car } alt="" />  </button>
                    </div>
                </section>
            </article>

            <article className="product-category">
                <p className='product-category-title'>Discover similar items</p>
            </article>
            
        </form>

    );
}

export default Product;