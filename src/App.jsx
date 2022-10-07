import './App.css';
import './index.css'
import { HashRouter, Routes ,Route, useNavigate } from "react-router-dom";
import { Home } from "./components/Home/Home.jsx";
import  Login  from "./components/Login/Login";
import { Nav } from './components/Nav/Nav.jsx';
import  ProtectedRoutes  from './components/ProtetedRouters.jsx';
import  Product  from './components/Product/Product';
import Register from './components/Register/Register';
import UserPerfil from './components/UserPerfil/UserPerfil';
import Purchases from './components/Purchases/Purchases.jsx';
import { useState } from 'react';
import AsideCard from './components/AsideCard/AsideCard';

function App() {

    let [ show, setShow ] = useState(false);
    const auth = localStorage.getItem('token');
    let [ buy, setBuy ] = useState(0);

    const showAsideCard = () => {
        setShow(!show);
    };
    const setAsideProduct = () => {
        setBuy(buy = buy + 1);
    };

    return (
        <HashRouter>
            <div className="App">
                <Nav visivilityASideCar={ showAsideCard } />
                <AsideCard isVisibility={ show } update={ buy }/>
                <Routes>
                    <Route path="/" element={ <Home visivilityASideCar={ showAsideCard } setAsideProduct={ setAsideProduct } /> }/>
                    <Route path="/login" element={ <Login/> }/>
                    <Route path="/register" element={ <Register/> }/>
                    <Route path="/product/:id/" element={ <Product/> }/>
                    <Route element={<ProtectedRoutes/>}>
                        <Route path="/user" element={ <UserPerfil/> }/>
                        <Route path="/purchases" element={ <Purchases/> }/>
                        <Route path="/userCar" element={ <Home/> }/>
                    </Route>
                </Routes>
            </div>
         </HashRouter>
    );
}

export default App
//https://codesandbox.io/s/news-app-3ydniu?file=/src/App.js