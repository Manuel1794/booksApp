import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Home.css'
import Title from '../title/Title';
import SavedBooks from '../savedbooks/SavedBooks';
import BooksContent from '../bookslist/BooksContent';
import useWidth from '../../../../custom-hooks/useWidth';
import LogoutHome from './LogoutHome';
import AgregarNuevoLibro from './AgregarNuevoLibro';

const Home = () => {

    const {isPersDevice} = useWidth()
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [booksSaved,setBooksSaved] = useState([])
    const [numberBooksSaved,setNumberBooksSaved] = useState(null)

    const handleResults = (results,numberBooks) => {
      setBooksSaved(results)
      setNumberBooksSaved(numberBooks)
    }

    return( 
      <div className={`${isPersDevice?'homeSmall':'home col-lg-10 col-md-10 col-sm-11'}`} >
        <div className='d-flex row  mainMain'>
          <Title mainTitle="BooksApp"/> 
          <AgregarNuevoLibro  
            setIsOpenModal={setIsOpenModal}
          /> 
          {!isPersDevice &&
            <LogoutHome />
          }
        </div>  
        <BooksContent {...{isOpenModal,setIsOpenModal,booksSaved,numberBooksSaved}}/>
        <SavedBooks onResults={handleResults}/>
      </div>     
    )
}

export { Home }