import React, { useEffect, useState } from 'react'
import SinComenzar from './state-reviews/sin-comenzar/SinComenzar'
import Leyendo from './state-reviews/leyendo/Leyendo';
import AgregarReview from './state-reviews/leyendo/AgregarReview';
import Spinner from '../spinner/Spinner';
import { db } from '../../../../../firebase';
import { IoMdAddCircleOutline } from 'react-icons/io';

const Reviews =({id,currentUser}) => { 

    const [loading,setLoading] = useState(true)

    const [data,setData]=useState([])
    const [valuesToEdit, setValuesToEdit] = useState()
    const [idResena,setIdResena] = useState()

    const [sinLeer, setSinLeer] = useState(false)
    const [addReview,setAddReview]= useState(false)
    const [buttonAdd,setButtonAdd] = useState(false)
    const [options,setOptions] = useState(true)
    const [resenasUser,setResenasUser] = useState(0)


    const probando = async () => {
        db.collection('usersResenas').doc(currentUser)
            .collection('resenas').doc(id)
            .collection('reviews')
            .onSnapshot(querySnapshot=>{
                let numberResenas = 0
                const reviews = []
                querySnapshot.docs.map(doc=>{
                    numberResenas++
                    return reviews.push({...doc.data(),id:doc.id})
                },error=>{
                    alert('error obtenido datos')
                })
                setResenasUser(numberResenas)
                const others = () => {
                    setButtonAdd(true)
                    setData(reviews)
                    setLoading(false)
                }
                if (reviews.length<1) {
                    setSinLeer(true)
                    setAddReview(false)
                    others()
                }else{
                    others()
                }
            }) 
    }

    const abrirFormAddReview = () => {
        if(data.length===0) {
            setSinLeer(false)
        }
        setAddReview(true)
        setButtonAdd(false)
        setOptions(false)
    } 

    const handleEdit = (review,idResena) => {
        setValuesToEdit(review)
        setIdResena(idResena)
    }

    useEffect(()=>{
        if(id!==null){
            setTimeout(()=>{
                probando()
            },120)
        }
    },[]) 
     
    return (   
        <div className={` ${data.length<1?'':'withData'} reviews position-relative`}>
        <div className="sombraDetail">
            {loading && <Spinner/>}
            {buttonAdd && 
                <IoMdAddCircleOutline 
                    className="addReview" 
                    size={33}
                    onClick={()=>abrirFormAddReview()}
                    style={{cursor:"pointer"}}
                />
            } 
            {sinLeer &&  
                <SinComenzar/>
            } 
            <Leyendo 
                {...
                    {data,id,handleEdit,
                    setAddReview,
                    setButtonAdd,
                    options, setOptions,
                    currentUser}
                }
            /> 
            {addReview && 
                <AgregarReview 
                    {... 
                        {
                            id,data,idResena,
                            setIdResena,
                            valuesToEdit,
                            setValuesToEdit,setAddReview,
                            setOptions,setButtonAdd,
                            setSinLeer,currentUser,
                            resenasUser
                        }
                    }
                />
            }
        </div>
            
        </div>
    )
}

export default Reviews