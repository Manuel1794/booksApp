import React, { useState } from 'react'

import {MdSend} from 'react-icons/md'
import {AiFillCloseCircle} from 'react-icons/ai'

import agregarReviewFb from '../../../../../../c-helpers/agregarReviewFb'
import updateReviewFb from '../../../../../../c-helpers/updateReviewFb'
import '../../Detail.css'

const AgregarReview = (props) => {


    const {id, valuesToEdit,
        idResena, setAddReview,
        setButtonAdd,setOptions,
        setSinLeer,data,setIdResena,
        setValuesToEdit,currentUser,
        resenasUser} = props

    const [charsTt,setCharsTt] = useState('425')
    const [error,setError]=useState(false)
        
    const newOne = {
        cap:"",
        pag:"",
        review:""
    }
    const [contentDetails,setContentDetails]=useState(valuesToEdit||newOne)
    const {cap,pag,review} = contentDetails

    const containNumber = (text) => {
        const patron = /^(\s*|\d+)$/
        return text.match(patron)
    }

    const handleInputPagCap = (e) => {
        const text=e.target.value
        if(!containNumber(text)){
            alert('sólo números')
        }else{
            const addValuesToReview = {
                ...contentDetails,
                [e.target.name]:text.trim()
            }
            setContentDetails(addValuesToReview)
        }   
    } 

    const caracteresTextarea = (valueTextTarea) => {
        const maxChars = 425
        const diff = maxChars - valueTextTarea.length
        setCharsTt(Math.abs(diff))
    }

    const handleInputTextarea = (e) => {
        const {name,value} = e.target
        caracteresTextarea(value)
        setContentDetails({...contentDetails, [name]:value} )
    }

    const handleSubmit = (e)=> {
        e.preventDefault()
        if(cap.trim()===""||pag.trim()===""||review.trim()===""){
            return alert('Debes llenar todos los campos')
        }
        const valuesToFb = {
            cap:cap,
            pag:pag,
            review:review.trim()
        }

        const others = () => {
            setContentDetails(newOne)
            setAddReview(false)
            setOptions(true)
        }

        if(valuesToEdit) {    
            updateReviewFb(valuesToFb,id,idResena,currentUser)
                .then(()=>{
                    alert('Reseña actualizada con éxito')
                })
                .catch(()=>{
                    alert('No se pudo actualizar')
                })
            setValuesToEdit(null)
            setIdResena(null)
            return others()
        }else {
            if(resenasUser===10){
                alert('Solo se pueden agregar 10 reseñas por libro')
                others()
            }else{
                agregarReviewFb(valuesToFb,id,currentUser)
                .then(()=>{
                    alert('Reseña agregada gregada con éxito')
                    return others()
                })
                .catch(()=>{
                    setError(true)
                    alert('no se pudo agregar')
                })
            return others()
            }
            
        }
    }

    const abrirCerrarAddButton = () => {
        setContentDetails(newOne)
        setAddReview(false)
        setButtonAdd(true)
        setOptions(true)
        if(data.length===0) {
            setSinLeer(true)
        }
        if(valuesToEdit) {
            setValuesToEdit(null)
        }
    }

    return ( 
        <>
            <div className="agregarReview"> 
                <AiFillCloseCircle 
                    className="botonForm"
                    size={25}
                    onClick={()=>abrirCerrarAddButton()}
                />
                <form onSubmit={handleSubmit}>
                    <div className="d-flex justify-content-center">
                        <div className="cap">
                            <input
                                type="text"
                                placeholder="#Cap"
                                name='cap'
                                value={cap}
                                onChange={handleInputPagCap}
                                maxLength={4}
                            />
                        </div>
                        <div className="pag">
                            <input
                                type="text"
                                placeholder="#Pag"
                                name='pag'
                                value={pag}
                                onChange={handleInputPagCap}
                                maxLength={4}
                            />
                        </div>
                    </div>
                    {error && <p className="errorSendReview">hubo un error enviando la review</p>}
                    <div className="textarea d-flex">
                        <textarea 
                            placeholder="Introduce aquí tu reseña..."
                            className="form-control mt-2"
                            name='review'
                            value={review}
                            onChange={handleInputTextarea}
                            maxLength={425}
                        />
                        <div className="textSons">
                            <p>{charsTt}</p>
                            <MdSend 
                                className="float-middle my-0"
                                size={32}
                                onClick={handleSubmit}
                                style={{cursor:"pointer"}}
                            />
                        </div>
                    </div>
                    
                </form>
            </div>
        </>
    )
}

export default AgregarReview