import firebase from "./firebaseInit";
const firebaseDB = firebase.firestore();
const firebaseUtilFuncs = {
  async createData(collection, data) {
    let docRef = await firebaseDB.collection(collection).add(data);
    return docRef;
  },

  readData(collection) {
    let rows = [];
    firebaseDB
      .collection(collection)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          rows.push({
            id: doc.id,
            ...doc.data()
          });
          console.log(doc.id, " => ", doc.data());
        });
        return rows;
      })
      .catch(error => {
        console.log("Error getting documents: ", error);
      });
  },

  async updateData(collection, data) {
    try {
      await firebaseDB
        .collection(collection)
        .doc(data.id)
        .update(data);
      console.log("Document successfully updated!");
    } catch (error) {
      console.log("Error getting documents: ", error);
    }
  },
  deleteData(collection, id) {
    firebaseDB
      .collection(collection)
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch(error => {
        console.error("Error removing document: ", error);
      });
  }
};

export default firebaseUtilFuncs;
