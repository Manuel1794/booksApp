const getFilterBooks = (texto) => {
    const item = document.getElementById('booksShown')
        const items=item.getElementsByClassName('bookCard')
        Array.from(items).map((detalle)=>{
            const obtenerTitle = detalle.getElementsByTagName('p')[0].textContent
            if(obtenerTitle.toLowerCase().indexOf(texto) !== -1) {
                return detalle.style.display = 'block';
            }else{
                return detalle.style.display= 'none';
            }
        })
}
 
export default getFilterBooks