import './style.css';
import key from '../../../public/key.svg';
import mail from '../../../public/mail.svg';
import visivility from '../../../public/visibility_FILL0_wght400_GRAD0_opsz48.svg';
import vilivilityOf from '../../../public/visibility_off.svg';
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


function Login() {

    let [ isVisivility, setVisivility ] = useState(false);
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const getUser = data => {
        axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users/login', data)
        .then(results => {
            localStorage.setItem("token", results.data.data.token);
            localStorage.setItem("user", results.data.data.user.firstName);
            navigate('/');
        });
    }
//pedrocamo92@hotmail.com
//trtrttwruy
    return (
        <div className='loginComponent'>
            <div className='loginContain'>
                <div className='login-titleContains'>
                    <h1 className='login-h1Title'>Welcome! Enter your email and password to continue</h1>
                    <p className='login-pTitle'>You have to Log In to access to your cart</p>
                </div>
                <div className='login-exapleContains'>
                    <p className='login-pExaple'>Test data</p>
                    <ul className='login-ulExaple'>
                        <li className='login-liExaple' ><img className='login-liImg' src={ mail } alt="" /> john@gmail.com</li>
                        <li className='login-liExaple' ><img className='login-liImg' src={ key } alt="" /> john1234</li>
                    </ul>
                </div>
                <div className='login-formContains'>
                    <form className='login-form' onSubmit={ handleSubmit(getUser) }>
                        <label className='login-label' htmlFor="user">Username</label>
                        <input type="text" name="" id="user" className="login-input" {...register("email")} placeholder="exaple@xxx.com" />
                        <label className='login-label' htmlFor="password">Password</label>
                        <div className='login-div-password'>
                            <input type={ isVisivility ? "text" : "password" } name="" id="password" className="login-input input2" {...register("password")} />
                            <button type="text" className='login-div-password-button' onClick={ () => setVisivility(!isVisivility) } >
                                <img className="login-div-password-img" src={ isVisivility ? vilivilityOf : visivility } alt="" />
                            </button> 
                        </div>
                        <button className='boxContainer_form-btn login-user' type="submit">Login</button>
                    </form>
                </div>
                <div className='login-registerContain'>
                    <b>Don't have an account?</b> <Link to="/Register">Sign up</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;