import React, { useState } from 'react'

import BooksList from './BooksList';
import SearchForm from '../searchform/SearchForm';
import Error from './Error';
import Spinner from '../spinner/Spinner';
import { getBooks } from '../../../../c-helpers/getBooks';
import { useAuth } from '../../../../contexts/AuthProvider';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import './BooksContent.css'

const BooksContent = (props) => {

    const {currentUser} = useAuth() 

    const {isOpenModal,setIsOpenModal,booksSaved,numberBooksSaved}=props

    const [books,setBooks] = useState([])
    const [bookToSearch,setBookToSearch] = useState('')
    
    const [loading,setLoading] = useState(false)
    const [error , setError] = useState(null)

    const handleResults = (respuesta) => {
      if(respuesta.totalItems===0){
        setLoading(false)
        setError('No hay resultados para esta búsqueda...')
      }else{
        setLoading(false)
        setBooks(respuesta.items)
      }
    }

    const handleChanges = (texto) => {
      setBookToSearch(texto)
    } 

    const handleSubmit = (e) => {
        e.preventDefault()

        if(error) setError(null)
        if(bookToSearch.trim()===""){
          alert('Debes introducir un libro a buscar')
        }else{
          setBooks([])
          setLoading(true)
          const buscar = bookToSearch.trim().replace(/\s+/g,' ')
          getBooks(buscar) 
              .then((respuesta)=> {
                handleResults(respuesta)
              })
              .catch(()=>{
                setLoading(false)
                setError('Hubo un error obteniendo los libros...')
              })
        }
    }

    return ( 
      <>      
        <div className={`modal ${ isOpenModal && 'modal-open'}`}>
          <div className="modalBooksList position-relative">
                <IoIosCloseCircleOutline 
                className="iconClose"
                size={38}
                  onClick={()=> {
                    setIsOpenModal(false)
                    setBooks([])
                  }}
                /> 
                  <div className="modalSearch">
                    <SearchForm 
                      descripcionPlaceholder="busca un libro..."
                      descripcionName='search'
                      handleChanges={handleChanges}
                      handleSubmit={handleSubmit}
                      value={bookToSearch}
                      maxLength={150}
                    />
                  </div>
                    <div className="booksResults">
                      {loading && <Spinner />}      
                      <BooksList   
                          booksSaved={booksSaved}
                          books={books} 
                          currentUser={currentUser}
                          numberBooksSaved={numberBooksSaved}
                      />
                      {error &&
                        <Error error={error}/>
                      }
                    </div>
          </div>
        </div>
        </>
    )
}

export default BooksContent