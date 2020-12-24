import { db } from '../../firebase';

export const getRatingStarFb = async (uid,id) => {
    await db.collection('usersBooks').doc(uid)
            .collection('books').doc(id).get()
}
