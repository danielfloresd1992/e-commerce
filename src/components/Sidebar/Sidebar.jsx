import './style.css';
import arrowTop from '../../../public/topArrow.svg';
import arrawBottom from '../../../public/bottomArrow.svg'
import { useState } from 'react';
import { useForm } from "react-hook-form";

export const Sidebar = ({ listCategory, filtCategory, resetToAll, fillterPrice, hidden }) => {

    const { handleSubmit ,register } = useForm();

    let [ hiddenBox1, setBox1 ] = useState(false);
    let [ hiddenBox2, setBox2 ] = useState(false);

    return(
        <aside className={ hidden ? 'aside' : 'asideHidden'}>
            <div className={ hiddenBox1 ? 'aside-boxContainer hidden' : 'aside-boxContainer' }>
                <form action="" className='aside-boxContainer_form' onSubmit={ handleSubmit(fillterPrice) } >
                    <div className='boxContainer_titleContains' onClick={ () => setBox1(!hiddenBox1) }>
                        <h2 className='boxContainer_form-tltle'>filter for price</h2>
                        <img className='boxContainer_form-img' src={ hiddenBox1 ? arrawBottom : arrowTop } alt="" />
                    </div>
                    <label htmlFor="fron" className='boxContainer_form-label'  >from 0$</label>
                    <input type="number" name="" id="fron" className='boxContainer_form-input' {...register('minPrice', { required: true })}/>
                    <label htmlFor="to" className='boxContainer_form-label'>To 1.000.000$</label>
                    <input type="number" name="" id="to" className='boxContainer_form-input' {...register('maxPrice', { required: true })}/>
                    <button type="submit"  className='boxContainer_form-btn'>Filter</button>
                </form>
            </div>

            <div className={ hiddenBox2 ? 'aside-boxContainer hidden' : 'aside-boxContainer' }>
                 <form action="" className='aside-boxContainer_form'>
                    <div className='boxContainer_titleContains' onClick={ () => setBox2(!hiddenBox2) }>
                        <h2 className='boxContainer_form-tltle'>Category</h2>
                        <img className='boxContainer_form-img' src={ hiddenBox2 ? arrawBottom : arrowTop } alt="" />
                    </div>
                    <div className='boxContainer_btnContains' >
                        {
                            listCategory ?
                            (
                                listCategory.map(category => (
                                    <button className='btnContains-btn' type='text' key={ category.id }
                                    onClick={e => { e.preventDefault(); filtCategory(category.name)} } 
                                    >{ category.name }</button>
                                ))
                            )
                            :
                            (
                                <p>esperando...</p>
                            )
                        }
                        <button className='btnContains-btn' type='text' 
                        onClick={e => { e.preventDefault(); resetToAll(); }} >All</button>
                    </div>
                </form>
            </div>
        </aside>
    );
};