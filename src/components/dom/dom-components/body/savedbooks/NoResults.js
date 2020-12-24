import React from 'react'
import { IoMdAddCircleOutline } from 'react-icons/io'

const NoResults = () => {
    return (
        <div className="noResultsBooks">
                <h4>Aún no has añadido un libro a la colección...</h4>
            <p>...haz click en el botón de <IoMdAddCircleOutline size={18}/> para realizar esta acción!</p>
        </div>
    )
}

export default NoResults
