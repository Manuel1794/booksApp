import React, { useEffect, useState } from 'react'
import './SavedBooks.css'
import Spinner from '../spinner/Spinner'
import { db } from '../../../../../firebase'
import SearchForm from '../searchform/SearchForm'
import { useAuth } from '../../../../contexts/AuthProvider';
import BooksCollection from './BooksCollection'
import NoResults from './NoResults'
import getFilterBooks from '../../../../c-helpers/getFilterBooks'

const SavedBooks = ({onResults}) => {

    const {currentUser} = useAuth()

    const [savedBooks, setSavedBooks] = useState([])
    const [loading,setLoading] = useState(true)
    const [noResults, setNoResults] = useState(false)
    const [filterResults,setFilterResults]=useState(false)

    const getDataFb = async () => {
        db.collection('usersBooks').doc(currentUser.uid).collection('books')
            .onSnapshot((querySnapshot) => {
                let numberBooks = 0
                const docs=[]
                querySnapshot.forEach((doc) => {
                    numberBooks++
                    docs.push({...doc.data()})          
                },error=>{
                    alert('error obteniendo los datos')
                })
                onResults(docs,numberBooks)
                setSavedBooks(docs)
                if(docs.length<1) {
                    setLoading(false)
                    setNoResults(true)
                    setFilterResults(false)
                }else{
                    setLoading(false)
                    setFilterResults(true)
                    setNoResults(false)
                }
                if(docs.length<2){
                    setFilterResults(false)
                }
            }
        )
    }

    const handleChanges= (texto) => {
        getFilterBooks(texto)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    useEffect( () => {
        setTimeout(()=>{
            getDataFb()
        },120)
    },[])

    return ( 
    <>
        <div className='d-flex justify-content-center'>
            {loading && <Spinner /> }
        </div>
        {!loading &&
        <>
            {filterResults &&
                <div className="d-flex justify-content-left">
                    <SearchForm 
                        descripcionPlaceholder="buscar en colección"
                        descripcionName='search'
                        handleChanges={handleChanges}
                        handleSubmit={handleSubmit}
                        maxLength={150}
                    /> 
                </div>
            }  
            <div className={`sombra`}>
                <div className="savedBooks d-flex justify-content-center">
                    <div className="mostradas" id="booksShown">
                        {noResults && <NoResults />} 
                        {!noResults &&
                            <BooksCollection savedBooks={savedBooks} loading={loading} />
                        }
                    </div>
                </div>
            </div>
        </>
        }
            </>               
        )
}

export default SavedBooks