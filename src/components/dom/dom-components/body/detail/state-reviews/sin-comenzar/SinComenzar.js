import React from 'react'
import { IoMdAddCircleOutline } from 'react-icons/io';
import '../../Detail.css'

const SinComenzar = () => {

    return (
        <div className="sinComenzar">
            <div className="d-flex align-items-center justify-content-center">
                <h4>Aún no has añadido algún comentario acerca de este libro...</h4>
            </div>
            <p>...haz click en el botón de <IoMdAddCircleOutline size={25}/> para comenzar a publicar tus reviews personales!</p>
        </div>
    )
}

export default SinComenzar
