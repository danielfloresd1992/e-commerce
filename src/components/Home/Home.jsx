import './style.css';
import search from '../../../public/search.svg';
import fill from '../../../public/filter.svg';
import { useEffect, useState } from "react";
import { Sidebar } from "../Sidebar/Sidebar.jsx";
import axios from 'axios';
import { ProductBox } from '../ProductBox/ProductBox';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductCar } from '../../store/slices/card';

export const Home = ({ visivilityASideCar, setAsideProduct }) => {
    
    let [ productAll, setProductAll ] = useState([]);
    let [ category, setCategory ] = useState([]);
    let [ reset, setReset ] = useState(false);
    let [ hiddenSidebar, setHiddenBar ] = useState(true);
   
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products')
        .then(data =>{ setProductAll(data.data.data.products)});
        axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories')
        .then(data => setCategory(data.data.data.categories));
    }, [ reset ]);

    const getProductCategory = category => {
        axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products')
        .then(data => setProductAll(data.data.data.products.filter(product => product.category.name === category)));
    };
    const resetProduct = () => {
        setReset(!reset);
    };
    const findProduct = (value) => {
        axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products')
        .then(data =>{ 
            const productFill = [];
            data.data.data.products.filter(product =>{
                product.title.split(' ').forEach(element => {
                    if(element.toUpperCase() === value.toUpperCase()) productFill.push(product);
                });
            });
            if(value){
                productFill.length  > 0 ? setProductAll(productFill) : setProductAll(null);
            }
            else{
                resetProduct();
            }
        });
    };
    const fillPriceProduct = (priceFillter) => {
        axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products')
        .then(data => { 
            let productsFill = data.data.data.products.filter(product => parseInt(product.price) >= priceFillter.minPrice && parseInt(product.price) <= priceFillter.maxPrice);
            setProductAll(productsFill);
        });
    };


    return(
        <main className="mainContent" >
            <Sidebar listCategory={ category } filtCategory={ getProductCategory } 
            resetToAll={ resetProduct } fillterPrice={ fillPriceProduct } hidden={ hiddenSidebar } />
            <div className='sliler-hiden' onClick={ () => setHiddenBar(!hiddenSidebar) }>
                <img className='sliler-hiden-img' src={ fill } alt=""  />
            </div>
            <section className='ProductContains'>
                <div className='ProductContains-searhContains'>
                    <input className='searhContains-input' type="text" name="" id="" placeholder='What are you looking for?' 
                    onChange={ e => findProduct(e.target.value) } />
                    <button className='searhContains-button' type='text'>
                        <img className='searhContains-ico' src={ search } alt="" />
                    </button>
                </div>
                    <div className='ProductContains-products-intermediated'>
                    {
                        productAll ? 
                        (
                            productAll.map( products => (
                               <ProductBox products={ products } key={ products.id } />
                               ))
                        )
                        :
                        (
                            productAll === null ?
                            (
                                <div className='products-load'>
                                    <h2 className='products-word'>the product does not exist</h2>
                                </div>
                            )
                            :
                            (
                                <div className='products-load'>
                                    <h2 className='products-word'>Await...</h2>
                                </div>
                            )
                        )
                    }
                    </div>
            </section>
    
        </main>
    );
}