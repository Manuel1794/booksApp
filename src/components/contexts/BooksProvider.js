import React, { useContext, useState } from 'react'
import { db } from '../../firebase';

const BooksContext = React.createContext()

export const useBook = () => {
    return useContext(BooksContext)
}


const BooksProvider = ({children}) =>{

    const [savedBooks,setSavedBooks] = useState([])

    const getDataFb = async () => {
        db.collection('usersBooks').doc(currentUser.uid).collection('books')
            .onSnapshot((querySnapshot) => {
                const docs=[]
                querySnapshot.forEach((doc) => {
                        docs.push({...doc.data()})          
                },error=>{
                    console.log('error obteniendo los datos')
                })
                setSavedBooks(docs)
            })
    }

    const data ={savedBooks,getDataFb}

    return(
        <BooksContext.Provider value = {data}>
            {children}
        </BooksContext.Provider>
    )
}

export default BooksProvider
