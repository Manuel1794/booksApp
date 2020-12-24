import React from 'react'

import '../../Detail.css'
import {AiOutlineEdit} from 'react-icons/ai'
import {MdDelete} from 'react-icons/md'
import deleteReview from '../../../../../../c-helpers/deleteReview';

const Leyendo =  (props) => {

    const {data,
        id,handleEdit,
        setAddReview, 
        setButtonAdd,
        options,
        setOptions,currentUser} = props

    const editReview = (cap,pag,resena,idResena) => {
        const valuesToEdit = {
            cap:cap,
            pag:pag,
            review:resena
        }
        setOptions(false)
        setAddReview(true)
        handleEdit(valuesToEdit,idResena)
        setButtonAdd(false)
    }

    const eraseReview = (idResena) => {
        deleteReview(id,idResena,currentUser) 
            .then(()=>{
                alert('Eliminada con éxito')
            })
            .catch(()=>{
                alert('No se pudo eliminar')
            })
    }

    return (
        <>
        <div className="detailResena">
            {
                data.map(review=>{
                    const {cap, pag, review:resena} = review.review
                    const { id:idResena } = review
                    return (
                        <div className="resena" key={idResena}>
                            { options &&
                                <div className="float-right my-2 mx-2">
                                    <AiOutlineEdit 
                                        className="mx-2" 
                                        size={21}
                                        onClick={()=>editReview(cap, pag,resena,idResena)}
                                        style={{cursor:"pointer"}}
                                    />
                                    <MdDelete 
                                        className="" 
                                        size={21}
                                        onClick={()=>eraseReview(idResena)}
                                        style={{cursor:"pointer"}}
                                    />
                                </div>
                            }
                            <div className="locationReview">
                                <p><strong>Cap: {cap}, Pag: {pag}</strong></p>
                            </div>
                            <div className="contentResena">
                                <p>{resena}</p>
                            </div>
                        </div>
                        )
                    })
                }
            </div>
        </>
    ) 
}

export default Leyendo