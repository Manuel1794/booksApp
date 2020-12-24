import React, { useEffect, useState } from 'react'

import { db } from '../../../../../firebase';
import './Detail.css'
import {FaStar} from "react-icons/fa"

const StarRating = ({id,ratingSaved,currentUser}) => {

    const [ratingStar,setRatingStar] = useState(null)
    const [hover,setHover]=useState(null)

    const saveRatingToFb = async (rating) => {
        if(window.confirm("¿Deseas guardar este rating para este libro?")) {
            setRatingStar(rating)
            db.collection('usersBooks').doc(currentUser)
            .collection('books').doc(id)
            .update({rating:rating})
            .then(()=>{
                alert('Rating agregado con éxito')
            })
            .catch(()=>{
                alert('No se pudo agregar el rating')
            })
        }
    }

    useEffect(()=> {
        if(ratingSaved!==null) setRatingStar(ratingSaved)
    },[ratingSaved])

    return (
        <div className="starRating">
            {[...Array(5)].map((star, i)=>{
                const rating = i + 1
                return (
                    <label key={rating}>
                        <input type="radio" name="rating" onClick={ ()=> saveRatingToFb(rating)} />
                        <FaStar 
                            className="star"
                            color={rating<=(hover||ratingStar)?'#ffe63f':'gray'} 
                            onMouseEnter={()=>setHover(rating)}
                            onMouseLeave={()=>setHover(null)}
                            size={39}
                            style={{cursor:"pointer"}}
                        />
                    </label>
                )
            })}
        </div>
    )
}

export default StarRating