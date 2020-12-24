import { db } from '../../firebase';

const agregarReviewFb = async (review,id,idUser) => {

        db.collection("usersResenas").doc(idUser)
        .collection("resenas").doc(id)
        .collection("reviews").doc()
        .set({review})
}

export default agregarReviewFb