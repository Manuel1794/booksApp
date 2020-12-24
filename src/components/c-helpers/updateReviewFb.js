import { db } from '../../firebase';

const updateReviewFb = async (review, id,idResena,currentUser) => {

    await db.collection("usersResenas").doc(currentUser)
            .collection("resenas").doc(id)
            .collection('reviews').doc(idResena)
            .update({review})
}

export default updateReviewFb