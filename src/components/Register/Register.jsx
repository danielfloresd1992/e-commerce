import './style.css';
import key from '../../../public/key.svg';
import mail from '../../../public/mail.svg';
import visivility from '../../../public/visibility_FILL0_wght400_GRAD0_opsz48.svg';
import vilivilityOf from '../../../public/visibility_off.svg';
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Register() {

    let [ isVisivility, setVisivility ] = useState(false);
    const { register, handleSubmit } = useForm();

    const navigate = useNavigate();

    const getUser = data => {
        let url = 'https://ecommerce-api-react.herokuapp.com/api/v1/users';
       console.log(data)
        axios.post(url, data)
        .then(results => {
            console.log(results);
            //localStorage.setItem("token", results.data.data.token);
            //alert(localStorage.getItem('token'));
            navigate('/login');
        })
        .catch(err => console.log(err.response));
    }

    return (
        <div className='loginComponent'>
            <div className='loginContain'>
                <div className='login-titleContains'>
                    <h1 className='login-h1Title'>Sign Up</h1>
                </div>
               
                <div className='login-formContains'>
                    <form className='login-form' onSubmit={ handleSubmit(getUser) }>

                        <label className='login-label' htmlFor="mail">Email</label>
                        <input type="text" name="" id="mail" className="login-input" {...register("email")} />

                        <label className='login-label' htmlFor="name">First name</label>
                        <input type="text" name="" id="name" className="login-input" {...register("firstName")} />

                        <label className='login-label' htmlFor="lastName">LastName</label>
                        <input type="text" name="" id="lastName" className="login-input" {...register("lastName")} />

                        
                        <label className='login-label' htmlFor="password">Password</label>
                        <div className='login-div-password'>
                            <input type={ isVisivility ? "text" : "password" } name="" id="password" className="login-input input2" {...register("password")} />
                            <button type="text" className='login-div-password-button' onClick={ () => setVisivility(!isVisivility) } >
                                <img className="login-div-password-img" src={isVisivility ? vilivilityOf : visivility } alt="" />
                            </button> 
                        </div>

                        <label className='login-label' htmlFor="phone">Phone</label>
                        <input type="text" name="" id="phone" className="login-input" {...register("phone")} />

                        <label className='login-label' htmlFor="admin">Role</label>
                        <input className="login-input" disabled="true"  type="text" name="" id="admin" {...register("role")} value="admin"/>
                        <button className='boxContainer_form-btn login-user' type="submit">Sign up</button>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default Register;