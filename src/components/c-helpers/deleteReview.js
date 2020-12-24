import { db } from '../../firebase';

const deleteReview =  async (id,idResena,currentUser) => {
    if(window.confirm('estas seguro que deseas eliminar esta review?')) {
        await db.collection('usersResenas').doc(currentUser)
                .collection('resenas').doc(id)
                .collection('reviews').doc(idResena)
                .delete()
    }
}   

export default deleteReview