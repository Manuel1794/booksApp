import { db } from '../../firebase';

export const deleteSavedBook = (uid,id) => {

    const deleteResenasUser = async () => {
        db.collection('usersResenas').doc(uid)
        .collection('resenas').doc(id)
        .collection('reviews').get()
        .then((res)=>{
            res.forEach(doc=>{
                doc.ref.delete()
            })
        })
    }

    const deleteBooksUser = async () => {
        db.collection('usersBooks').doc(uid)
            .collection('books').doc(id).delete()
    }

    if(window.confirm('¿Deseas eliminar este libro?')){
        try{
            deleteBooksUser()
            deleteResenasUser()
            alert('Se ha eliminado de la colección')
        }catch {
            alert('no se pudo eliminar')
        }
    }
}