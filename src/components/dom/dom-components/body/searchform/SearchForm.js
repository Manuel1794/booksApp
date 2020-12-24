import React from 'react'
import './SearchForm.css'
import { FaSearch } from 'react-icons/fa'

const SearchForm = ({descripcionPlaceholder,
                        descripcionName,
                        handleSubmit,
                        handleChanges,
                        value,maxLength
                        }) => {
                            
    return (
        <div className="formulario">
            <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id="searchValue"
                        placeholder= {descripcionPlaceholder}
                        name={descripcionName}
                        value={value}
                        onChange={ (e) => handleChanges(e.target.value)}
                        maxLength={maxLength}
                    /> 
                <FaSearch 
                    size={25}
                    onClick={handleSubmit}
                    id="searchIcon"
                />
            </form>
        </div>
    )
}

export default SearchForm