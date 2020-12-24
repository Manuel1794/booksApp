import React from 'react'
import { IoMdAddCircleOutline } from 'react-icons/io';
import './Home.css'

const AgregarNuevoLibro = ({setIsOpenModal}) => {

    return (
        <div className='nuevoLibro'>
            <IoMdAddCircleOutline 
                className="icono" 
                size={32}
                onClick={()=>setIsOpenModal(true)}
            />
                <p>Agregar libro a la colección</p>
        </div>
    )
}

export default AgregarNuevoLibro
