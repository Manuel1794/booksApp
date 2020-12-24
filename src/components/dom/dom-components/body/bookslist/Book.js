import React, { useEffect, useState } from 'react'
import { saveBookFb } from '../../../../c-helpers/saveBookFb';

const Book = ({id,title,poster,currentUser,booksSaved,numberBooksSaved}) => {

    const [bookAdded,setBookAdded] = useState(false)
    const {uid} = currentUser

    const saveBook = async () => {  
        const book = {
            id:id,
            title:title,
            poster:poster,
            rating:null,
            status:null,
            favorites:null
        }   
        
        if(numberBooksSaved===10){
            setBookAdded(true)
            return alert('Solo se pueden agregar 10 libros a la colección')
        }else{
            setBookAdded(false)
            saveBookFb(uid,id,book)
                .then(()=>{
                    setBookAdded(true)
                    alert('Se agregó el libro a la colección')
                })
                .catch(()=>{
                    setBookAdded(true)
                    alert('No se pudo agregar')
                })
        }
    }

    useEffect(()=>{
        booksSaved.map((book)=>{
            if(book.id===id) {
                return setBookAdded(true)
            }
        })
    },[booksSaved,id])

    return (
        <>
        <div className="card cardSearch">
            <img src={poster} alt={title} className="img-fluid imgSearch"/>
            <div className="card-body">
                <p>{title}</p>
            </div> 
            <button className={`${bookAdded?'addedBook':'botonAgregar'}`} 
                    onClick={ ()=> saveBook() }
                    disabled={bookAdded}
            >
                {!bookAdded? 'Añadir':'Añadido'}
            </button>
        </div>
        </>
    ) 
}

export default Book