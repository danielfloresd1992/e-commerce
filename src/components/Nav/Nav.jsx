import './style.css';
import count from '../../../public/secctions.svg';
import inventory from '../../../public/invent.svg';
import car from '../../../public/car.svg';
import { useNavigate } from 'react-router';


export const Nav = ({ visivilityASideCar  }) => {

    const navigate = useNavigate();

    return (
        <nav className='navbar' >
            <div className='nav-ico'>
                <h1 className='nav-ico_title' onClick={ () => navigate('/') }>e-commerce</h1>
            </div>
            <div className='nav-buttons'>
                <button className="nav-btn" onClick={ () => navigate('/user/') } ><img className='nav-btn_img' src={ count } alt="" /></button>
                <button className="nav-btn" onClick={ () => navigate('/purchases') } ><img className='nav-btn_img' src={ inventory } alt="" /></button>
                <button className="nav-btn" onClick={ () => localStorage.getItem('token') ? visivilityASideCar() : navigate('./login')} ><img className='nav-btn_img' src={ car } alt="" /></button>
                
            </div>
        </nav>
  );
};
