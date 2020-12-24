import React from 'react'
import BooksRendered from './BooksRendered';
import './SavedBooks.css'

const BooksCollection = ({savedBooks}) => {
 
    return (
        <>
        <div className="d-flex row justify-content-center booksCollection">
            { 
                savedBooks.map(book => {
                    const {id,title,poster,rating}=book
                    return ( 
                        <div 
                            className='prueba position-relative'
                            key={id} id={id}
                        >   
                            <BooksRendered
                                {...{id,title,poster,rating}}
                            />
                        </div>   
                    )
                })
                }
        </div>
        </>
    )
}

export default BooksCollection
