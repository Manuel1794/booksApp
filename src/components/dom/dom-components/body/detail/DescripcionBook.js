import React from 'react'
import useWidth from '../../../../custom-hooks/useWidth'
import './Detail.css'

const DescripcionBook = ({books}) => {
    
    const {isMobileDevice,isMediumDevice}=useWidth()
    
    const { 
        volumeInfo:{
            title:titulo}} = books
            
            const autor = books.volumeInfo.authors
            const categories = books.volumeInfo.categories
            const paginas = books.volumeInfo.pageCount
            const poster = books.volumeInfo.imageLinks
            
    return (
        <div className ={`d-flex flex-wrap ${isMobileDevice?'justify-content-center':'align-items-start'} descripcionBook"`}>
            <div className="imagenDetail d-flex justify-content-center">
                <img 
                    src={poster.smallThumbnail} 
                    className="img-fluid imagenThumbnailDetail"
                    alt={titulo}
                /> 
            </div>
            <div className={`contentDescripcion ${isMediumDevice?'text-left':'text-center'} col-lg-9 col-md-8 col-sm-12`} >
                <h4>{titulo}</h4>
                <p><strong>Autor:  </strong>{autor?autor:'no suministrado por el proveedor de datos'}</p>
                <p><strong>Categorías:  </strong>{categories?[categories]:'no suministrado por el proveedor de datos'} </p>
                <p><strong>Número de Páginas: </strong> {paginas?paginas:'no suministrado por el proveedor de datos'}</p>
            </div> 
        </div>
    )
}

export default DescripcionBook