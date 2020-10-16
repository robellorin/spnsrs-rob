import firebase from "./firebaseInit";
export const firebaseDB = firebase.firestore();

export const createData = (collection, data) => {
  firebaseDB
    .collection(collection)
    .add(data)
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch(error => {
      console.error("Error writing document: ", error);
    });
};

export const readData = collection => {
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
};

export const updateData = (collection, data) => {
  firebaseDB
    .collection(collection)
    .doc(data.id)
    .update(data)
    .then(() => {
      console.log("Document successfully updated!");
    })
    .catch(error => {
      console.error("Error updating document: ", error);
    });
};

export const deleteData = (collection, id) => {
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
};
