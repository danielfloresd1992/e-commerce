import './style.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getPurchises } from '../../store/slices/purchases.js';
import { Link, useNavigate } from 'react-router-dom';

function Purchases() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const purchises = useSelector((state) => state.purchases);

    useEffect(() => {
        dispatch(getPurchises());
    }, []);

    return (
        <div className='purchases-component'>
            <div className='purchases-goHomeContain'>
                <p className='purchases-goHome'><Link to={'/'}>Home</Link> Purchases</p>
            </div>
            <div className='purchases-titleContain'>
                <h1 className='purchases-title'>My purchases</h1>
            </div>
            <div className='purchises-articleContain' >
                {
                    purchises.map(purs => (
                        <article className="purchises-articleIndividaul" hey={purs.id}>
                            <div className='purchises-article-dataContain'>
                                <p className='purchises-article-data'>{new Date().toLocaleDateString('en-us', purs.createdAt)}</p>
                            </div>
                            {
                                purs.cart.products.map(product => (
                                    <div className='purshise-article-descriptionContain' key={ product.id } onClick={() => navigate(`/product/${ product.id }/`)}>
                                        <div className='purshise-article-typeArticle'>
                                            <div>
                                                <b className='purshise-article-nameArticle' >{product.brand}</b>
                                            </div>
                                            <div className='purshise-article-cuantityContain'>
                                                <p className='purshise-article-cuantity'>{product.productsInCart.quantity}</p>
                                            </div>
                                            <div>
                                                <b className='purshise-article-price'>${product.price}</b>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </article>


                    ))
                }
            </div>
        </div>
    );
}
export default Purchases;