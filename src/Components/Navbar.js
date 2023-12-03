import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import kletechlogo from './kletechlogo.png'

function Navbar({ isLoggedIn, changeStatus }){
    const navigate = useNavigate();
    function handleSignOutSignIn(){
        if(isLoggedIn){
            changeStatus(false)
            localStorage.clear();
            navigate('/');
        } else {
            navigate('/login');
        }
    }
    return (
        <div className='navbar'>
            <div className='box'>
                <img src={kletechlogo} id='img'/>
            </div>
            <div className='login' onClick={handleSignOutSignIn}>
                { isLoggedIn ? 'Logout' : 'Login'}
            </div>
        </div>
    );
}

export default Navbar;