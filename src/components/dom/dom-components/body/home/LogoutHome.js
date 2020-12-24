import React from 'react'
import { IoMdLogOut } from 'react-icons/io';
import { useAuth } from '../../../../contexts/AuthProvider';
import './Home.css'

const LogoutHome = () => {

    const {logout} = useAuth()

    return (
        <div className="logoutHome">
                <IoMdLogOut 
                    size={31}
                    color='#000'
                    className="icono"
                    onClick={()=>logout()}
                />
            <p>salir</p> 
        </div>
    )
}

export default LogoutHome
