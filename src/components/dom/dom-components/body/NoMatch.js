import React from 'react'
import { Link } from 'react-router-dom'

const NoMatch = () => {
    return (
        <div className="col-lg-10 col-md-10 col-sm-11 col-12">
            <p>Estás entrando en una página que no existe</p>
            <p>Vuelve a la página de inicio dando click <Link to = '/'>aquí</Link></p>
        </div>
    )
}

export default NoMatch
