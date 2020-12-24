import { db } from '../../firebase';

export const saveBookFb = async (uid,id,book) => {

        db.collection('usersBooks').doc(uid)
        .collection('books').doc(id).set(book)
}