import './style.css';
import { useNavigate } from 'react-router-dom';

function UserPerfil(){

    const navigate = useNavigate();
    const deleteUser = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/');
    };

    return(
        <div className="perfil-component">
            <div className='perfil-contain'>
                <img className="perfil-img" src="" alt="" />
                <h3 className="perfil-h3" >{ localStorage.getItem('user') }</h3>
                <p className="perfil-p" onClick={ deleteUser } >Log out</p>
            </div>
        </div>
    );
}

export default UserPerfil;