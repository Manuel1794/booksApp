import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../../../contexts/AuthProvider'
import { MdDelete } from 'react-icons/md'
import {FaStar} from "react-icons/fa"
import { deleteSavedBook } from '../../../../c-helpers/deleteSavedBook';
import './SavedBooks.css'

const BooksRendered = (props) => {

    const {id,title,poster,rating} = props
    const {currentUser} = useAuth()
    const {uid} = currentUser

    const [showRating, setShowRating] = useState(false)
    
    const description = () => {
        let descripcion = ''
        if(title.length<80){
            descripcion=title
        }else {
            const reducir = title.substring(0,80)
            descripcion = reducir + '.....'
        }
        return descripcion
    }

    useEffect(()=>{
        if(rating!=null) {
            setShowRating(true)
        }
    },[rating])

    return (
    <>
        <div className="ratingEstrellas">
            {showRating && 
                [...Array(rating)].map((star,i)=> {
                    const key=i+1
                    return (
                        <label key={key} className="">
                            <FaStar
                                className="star"
                                size={22}
                                color=''
                            />
                        </label>
                    )
                })
            }
        </div> 
        <div className="bookCard ">
            <div className="card cardContent">  
                <NavLink to ={`/detail/${id}`} >
                    <img 
                        src={poster} 
                        alt={title} 
                        className="img-fluid imageBook"
                    /> 
                </NavLink>
                <div className="card-body cardBody">
                    <p>{description()}</p>
                    <div className="deleteBook">
                        <MdDelete
                            onClick={() => deleteSavedBook(uid,id)}
                            size={25}
                            color='#000'
                        />
                    </div>
                </div>
            </div>
        </div>
    </>        
    )
}

export default BooksRendered