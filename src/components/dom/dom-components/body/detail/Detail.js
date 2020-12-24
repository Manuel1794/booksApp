import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { db } from '../../../../../firebase';

import DescripcionBook from './DescripcionBook';
import Reviews from './Reviews';
import StarRating from './StarRating';
import { useAuth } from '../../../../contexts/AuthProvider';
import { getBook } from '../../../../c-helpers/getBook';

import 'bootstrap/dist/css/bootstrap.min.css'
import './Detail.css'
import Spinner from '../spinner/Spinner';
import { IoIosCloseCircleOutline } from "react-icons/io"

const Detail = () => {
    const {currentUser} = useAuth()
    const { id } = useParams()
    const [loading,setLoading] = useState(true)

    const [books, setBooks] = useState({})
    const [ratingStar,setRatingStar] = useState(null)


    useEffect(()=> {

        const getRatingStarFb = async () => {
            db.collection('usersBooks').doc(currentUser.uid)
                .collection('books').doc(id).get()
                .then(doc=>{
                    setRatingStar(doc.data().rating)
                })
                .catch(()=>{
                    console.log('error cargando las estrellas')
                })
        } 

        getRatingStarFb()
        setTimeout(()=> { 
            getBook(id)
                .then((results)=>{
                    setBooks(results)
                    setLoading(false)
                })
                .catch(()=>{
                    console.log('no se pueden obtener los datos del servidor')
                })
        },120) 
    },[currentUser.uid,id])

    return (
        <div className={`modal modal-open detail`} >
            <div className="modalDetail position-relative" >
                <Link to ='/'>
                    <IoIosCloseCircleOutline 
                    className="iconCloseDetail" 
                    size={35}
                />
                </Link>
                <div className="detailContent">
                    {loading && <Spinner />}
                    {!loading && 
                        <DescripcionBook
                            books={books}
                        />
                    }
                    <Reviews 
                        id={id}
                        currentUser={currentUser.uid}
                    /> 
                    <div className="d-flex justify-content-center">
                        {!loading && 
                            <StarRating 
                                id={id}
                                ratingSaved={ratingStar}
                                currentUser={currentUser.uid}
                            /> 
                        }                
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail