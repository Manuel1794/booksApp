import React from 'react'
import Book from './Book';
import './BooksContent.css'

const BooksList = ({currentUser,books,booksSaved,numberBooksSaved}) => {
    return (
        <div className="d-flex flex-row justify-content-center flex-wrap BooksList">
          {
            books.map( libro=>{
              const {id,selfLink,
                volumeInfo:{
                title:titulo,
                imageLinks:{thumbnail:poster}
                }} = libro
              const autor=libro.volumeInfo.authors
                return ( 
                  <div key={id} className="libroResponse">
                    <Book 
                      currentUser={currentUser}
                      id={id}
                      title={titulo} 
                      poster={poster}
                      book={selfLink}
                      author={autor?autor:'sin autor'}
                      booksSaved={booksSaved}
                      numberBooksSaved={numberBooksSaved}
                    />
                  </div>
                )
            })
          }
        </div>
    )
}

export default BooksList
