import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import ErrorSign from './ErrorSign';
import { googleSignin } from './GoogleSignin';
import './login.css'

const Login = ({history}) => {

    const {login} = useAuth()

    const [errorLogin,setErrorLogin] = useState(null)
    const [errorInput,setErrorInput] = useState(false)
    const [disableLogin,setDisableLogin]=useState(false)
    const [errorUser,setErrorUser] = useState(false)

    const emailRef = useRef()
    const passwordRef = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setDisableLogin(true)
        
        if(emailRef.current.value.trim()===""||passwordRef.current.value.trim()===""){
            setDisableLogin(false)
            return alert('llena todos los campos')
        }
        try{
            await login(emailRef.current.value, passwordRef.current.value)
            history.push('/')
        }catch(error){
            if(error.code==='auth/user-not-found') {
                setErrorUser(true)
                setDisableLogin(false)
                return setErrorLogin('usuario no encontrado')
            }else if(error.code==='auth/wrong-password'){
                setDisableLogin(false)
                setErrorInput(true)
                return setErrorLogin('contraseña incorrecta')
            }else if(error.code==='auth/too-many-requests'){
                setDisableLogin(false)
                return setErrorLogin('tu cuenta se ha bloqueado')
            }
            else{
                setDisableLogin(false)
                return setErrorLogin('hubo un error iniciando sesión')
            }
            
        }
    }

    const loginGoogle = () => {
        googleSignin()
            .then(()=>{
                history.push('/')
            })
            .catch((error)=>{
                setErrorLogin('error al iniciar sesión')
                console.log(error)
            })
    }
    
    return (
        <div className="login">
            <div className="contentLogin col-md-7 col-sm-9 col-lg-5 col-11">
                <img src={require("../assets/img/Logo.png")} className="logoLogin img-fluid" alt='BooksApp' />
                <div className="contenidoLogin">
                    <div className="messageLogin">
                    {!errorLogin && <p>Ingresa tus datos</p>}
                    {errorLogin && <ErrorSign errorLogin={errorLogin}/>}
                    </div>
                    <form onSubmit={handleSubmit} className="loginForm">
                    <div className="d-flex flex-column ">
                        <label for="email">
                            Email
                        </label>
                            <input
                                type="email"
                                placeholder="introduce tu email"
                                name='email'
                                ref={emailRef}
                                className={`${errorUser?'errorInput':'inputLogin'}`}
                                maxLength={76}
                            />
                    </div>
                    <div className="d-flex flex-column">
                        <label for="password">
                            Contraseña
                        </label>
                            <input
                                type="password"
                                placeholder="introduce tu contraseña"
                                name='password'
                                ref={passwordRef}
                                className={`${errorInput?'errorInput':'inputLogin'}`}
                                maxLength={28}
                            /> 
                    </div>
                        <button type="submit" disabled={disableLogin}>Entrar</button>
                    </form>
                    <div className="googleSign" onClick={()=>loginGoogle()}>
                        <img src={require("../assets/img/googleIcon.png")} alt="ingresar con google" 
                        className="googleIcon"/>
                        <p>Entrar con Google</p>
                    </div>
                    <div className="noAccount">
                        <p><strong>¿No tienes cuenta? </strong><Link to = '/signup'>Regístrate</Link></p>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Login
