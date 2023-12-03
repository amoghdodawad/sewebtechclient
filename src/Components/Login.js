import React, { useRef, useState } from 'react';
import { checkValidData } from '../utils/validate';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSignIn } from '../hooks/useSignIn';
import './Login.css'

function Login({ changeStatus }){
    const [ isSignInForm, setIsSignInForm ] = useState(true);
    const [ errorMessage, setErrorMessage ] = useState(null);
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef (null);
    const isAdmin = useRef('faculty');
    const navigate = useNavigate();
    const next = useSearchParams()[0].get('next');
    // const signIn = useSignIn();

    function handleFormTypeChange (){
        setIsSignInForm(!isSignInForm);
    }

    function handleFormSubmit(){
        const response = checkValidData(email.current.value ,password.current.value);
        setErrorMessage(response);
        if(response) {
            return;
        }

        if(!isSignInForm){
            // SignUp logic
            async function signUp(){
                const response = await fetch('/api/auth/signup',{
                    method : 'POST',
                    body : JSON.stringify({
                        name : name.current.value,
                        email : email.current.value,
                        password : password.current.value,
                        role : isAdmin.current
                    }),
                    headers : {
                        'Content-Type' : 'application/json; charset=UTF-8'
                    }
                })
                if(response.status === 200){
                    const json = await response.json();
                    localStorage.setItem('name',json.name);
                    const token = response.headers.get('token');
                    localStorage.setItem('token',token);
                    changeStatus(true);
                    localStorage.setItem('isLoggedIn','true')
                    localStorage.setItem('role',json.role);
                    // next ? navigate(`/${next}`) : navigate('/faculty');
                    navigate(`/${json.role}`);
                } else if(response.status === 400){
                    const message = await response.json();
                    setErrorMessage(message.message);
                }
            }
            signUp();
        } else {
            async function signIn(){
                const response = await fetch('/api/auth/login',{
                        method : 'POST',
                        body : JSON.stringify({
                            name : 'Test',
                            email : email.current.value,
                            password : password.current.value,
                            role : isAdmin.current
                        }),
                        headers : {
                            'Content-Type' : 'application/json; charset=UTF-8'
                        }
                })
                if(response.status === 200){
                    const json = await response.json();
                    localStorage.setItem('name',json.name);
                    const token = response.headers.get('token');
                    localStorage.setItem('token',token);
                    changeStatus(true);
                    localStorage.setItem('isLoggedIn','true')
                    // next ? navigate(`/${next}`) : navigate('/faculty');
                    localStorage.setItem('role',json.role);
                    navigate(`/${json.role}`);
                } else if(response.status === 400 || response.status === 401) {
                    const message = await response.json();
                    setErrorMessage(message.message);
                }
            }
            signIn();
        }
    }

    return (
        <div className='h-screen w-screen bg-black login-container'>
            <form className='bg-opacity-80 bg-slate-300 lg:w-2/6 md:w-3/6 sm:w-4/6 w-3/4 absolute my-36 left-0 right-0 mx-auto p-6 text-white rounded-md form' onSubmit={(event) => {
                event.preventDefault();
            }}>
                <h1 className=' font-bold absolute px-7 text-black'>{isSignInForm ? 'Sign in' : 'Sign up'}</h1>
                <div className='flex flex-col items-center px-8 pt-8 input-container'>
                    {!isSignInForm && <input ref={name} type='text' placeholder='Full name' className='py-2 px-3 m-2 rounded-sm w-full bg-slate-500 bg-opacity-95 text-white input'></input>}
                    <input ref={email} type='text' placeholder='Email address' className='py-2 px-3 m-2 rounded-sm w-full bg-slate-500 bg-opacity-95 text-white input'></input>
                    <input ref={password} type='password' placeholder='Password' className='py-2 px-3 m-2 rounded-sm w-full bg-slate-500 text-white input'></input>
                    {!isSignInForm && <div className='input checkbox'>
                        <label for='admin-input'>Sign up as admin?</label>
                        <input type='checkbox' id='admin-input' onChange={()=>{
                            if(isAdmin.current === 'faculty') isAdmin.current = 'admin';
                            else isAdmin.current = 'faculty';
                        }}></input>
                    </div>}
                    <p className={`text-red-700 ${errorMessage && 'p-2 my-2'} rounded-sm font-black text-lg error`}>{errorMessage}</p>
                    {/* <button onClick={oAuthGoogle}>Google</button> */}
                    <button className='py-3 mx-4 my-6 px-3 bg-slate-700 rounded-sm font-bold w-full submit' onClick={handleFormSubmit}>{isSignInForm ? 'Sign in' : 'Sign up'}</button>
                </div> 
                <p className='hover:cursor-pointer text-center text-black font-semibold button' onClick={handleFormTypeChange}>{isSignInForm ? 'New to Website? Sign up now' : 'Already registered? Sign in'}</p>
            </form>
        </div>
    )
}

export default Login;