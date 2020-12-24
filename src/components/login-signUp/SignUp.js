import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import {useAuth} from '../contexts/AuthProvider';
import ErrorSign from './ErrorSign';
import verifyPassword from './passwordValidator';

const SignUp = () => {

    const {signup} = useAuth()
    const emailRef = useRef()
    const passwordRefI = useRef()
    const passwordRefII = useRef()

    const [errorLogin,setErrorLogin] = useState(null)
    const [errorInput,setErrorInput] = useState(false)
    const [errorEmail,setErrorEmail] = useState(false)
    const [disableLogin,setDisableLogin]=useState(false)
    const [createSuccess,setCreateSuccess]=useState(false)

    const registerUser = async ()=>{
        try{
            await signup(emailRef.current.value.trim() , passwordRefI.current.value) 
            setCreateSuccess(true)
        }catch(error){
            if(error.code==='auth/network-request-failed') {
                setDisableLogin(false)
                return setErrorLogin('hubo un error creando la cuenta')
            }else if(error.code==="auth/email-already-in-use") {
                setErrorEmail(true)
                setDisableLogin(false)
                return setErrorLogin('ya existe una cuenta con este correo')
            }
        }
    }
    
    const handleSubmit =  (e) => {
        e.preventDefault()

        setDisableLogin(true)
        if( passwordRefI.current.value.trim()===""||
            passwordRefII.current.value.trim()===""||
            emailRef.current.value.trim()===""
            )
        {
            setDisableLogin(false)
            return alert('llena todos los campos mardito')
        }
        if(passwordRefI.current.value!==passwordRefII.current.value){
            setErrorInput(true)
            setDisableLogin(false)
            return setErrorLogin('las contraseñas deben coincidir')
        }
        if(passwordRefI.current.value.length> 28){
            setErrorInput(true)
            setDisableLogin(false)
            return setErrorLogin('la contraseña debe tener un máximo de 28 carácteres')
        }else if(passwordRefI.current.value.length< 8){
            setErrorInput(true)
            setDisableLogin(false)
            return setErrorLogin('la contraseña debe tener al menos 8 caracteres')
        }else{
            verifyPassword(passwordRefI.current.value)
                .then((res)=>{
                    console.log(res)
                    if(res!=='success'){
                        console.log(res)
                        setDisableLogin(false)
                        return setErrorLogin(res)
                    }else{
                        return registerUser()
                    }
                })
        }
    }

    return (
        <div className="login">
        <div className="contentLogin col-md-6 col-sm-8 col-lg-5 col-11">
            <img src={require("../assets/img/Logo.png")} className="logoSignup img-fluid" alt='BooksApp'/>
            <div className="contenidoLogin">
                <div className="messageSignup">
                    {!createSuccess &&
                        <div>
                            <p id="createMessage">Crear Cuenta</p>
                                {!errorLogin && <p >Ingresa tus datos</p>}
                                {errorLogin && <ErrorSign errorLogin={errorLogin}/>}
                        </div>
                    }
                </div> 
                {createSuccess&&
                    <div className="createSuccess">
                        <p>Tu cuenta ha sido creada satisfactoriamente, <Link to ='/login'>inicia sesión</Link> </p>
                    </div>
                }
                {!createSuccess &&
                    <form onSubmit={handleSubmit} className="loginForm">
                    <div className="d-flex flex-column">
                        <label>
                            Email
                        </label>
                            <input
                                type="email"
                                placeholder="introduce tu email"
                                name='email'
                                ref={emailRef}
                                className={`${errorEmail?'errorInput':'inputLogin'}`}
                                maxLength={60}
                            />
                    </div>
                            <div className="d-flex flex-column">
                                <label>
                            Contraseña
                        </label>
                            <input
                                type="password"
                                placeholder="introduce tu contraseña"
                                name='password'
                                ref={passwordRefI}
                                className={`${errorInput?'errorInput':'inputLogin'}`}
                            />
                            </div>
                            <div className="d-flex flex-column">
                                <label>
                            Confirma la contraseña
                        </label>
                            <input
                                type="password"
                                placeholder="introduce tu contraseña"
                                name='password'
                                ref={passwordRefII}
                                className={`${errorInput?'errorInput':'inputLogin'}`}
                            />
                            </div>
                        <button type="submit" id="submitButton" disableLogin={disableLogin}>Crear</button>
                    </form>
                }
                <div className="noAccount">
                    {!createSuccess &&
                        <p><strong>¿ya tienes una cuenta? </strong><Link to = '/login'>inicia sesión</Link></p>
                    }
                </div>
            </div>
        </div>
    </div>
    )
}

export default SignUp
