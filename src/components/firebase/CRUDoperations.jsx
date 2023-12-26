import { db } from "./Config";
import {
  collection,
  doc,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  onSnapshot
} from "firebase/firestore";
import moment from "moment";
import { useSelector } from "react-redux";

// TO Add the data we need only collectionRef means only the colleciton level  (addDoc)
// addDoc(collection(db, "todos"), todoObject);   ==> CollectionRef = collection(db, "todos")

// TO Update or Delete the data, we need the document level reference (doc, updateDoc or DeleteDoc)
// docRef = doc(db, collectionName, doc.id);  ==> CollectionRef = colleciotn(db, collectionName) & documentRef = doc.id
// updateDoc(docRef, updatedData);
// deleteDoc(docRef)

// For Deleting items obtained using query, we can directly use deleteDoc(doc.ref) where mapping over that array forEach doc

// query & getDocs & querySnapshot.forEach(doc => {})
//getDocs to get the array of documents inside the collection. for this collectioRef is enough.
// const querySnapshot =  getDocs(db, collectionName)  collectionRef = collection(db, collectionName)

// But before that we need to query the collection to get that collection object if any condition need to be applied
// q = query(collectionRef, where("name", "==", projectName));
// const querySnapshot = getDocs(q)


export const listenToFirestoreSnapshot = (userUID, dispatch) => {
  // const userUID = getUserUID();

  const today = moment().format("YYYY-MM-DD");

  let collectionRef

  if (userUID){
    collectionRef = collection(db, userUID, "SubCollection", today);
  }else{
    collectionRef = collection(db, 'users')
  }


  onSnapshot(collectionRef, (snapshot) => {
    // const dispatch = useDispatch();

    try {
      const fetchedData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(), // Use doc.data() to get the document's data
      }));

      const propertiesAdded = fetchedData;

      dispatch({
        type: "update",
        payload: propertiesAdded,
      });

    } catch (err) {
      console.error("Error in fetching Projects data", err);
    }
  });
};

// Usage:
// listenToFirestoreSnapshot();

// export async function manageAddNewTodo(todoObject){
export const useAddNewProp = () => {
  
  const userUID = useSelector((state) => state.login.userUID);
  // console.log(todoObject)
  // console.log(todoObject.date)
  // console.log(todoObject.text)
  const manageAddNewProp = async (newPropObj) => {
    try {
      let collectionRef;

      const today = moment().format("YYYY-MM-DD");

      collectionRef = collection(db, userUID, "SubCollection", today);

      addDoc(collectionRef, newPropObj);

    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  return manageAddNewProp;
};

export const useUpdateProp = () => {
  const userUID = useSelector((state) => state.login.userUID);

  const manageUpdateProp = async (updatePropObj, updatePropObjID) => {
    try {
      const today = moment().format("YYYY-MM-DD");

      const collectionRef = collection(db, userUID, "SubCollection", today);

      const q = query(
        collectionRef,
        where("propArea", "==", updatePropObj["propArea"]),
        where("propName", "==", updatePropObj["propName"])
      );
      const querySnapshot = await getDocs(q);
      // Check if any...
      if (querySnapshot.size === 1) {
        const docRef = doc(collectionRef, updatePropObjID);

        await updateDoc(docRef, { ...updatePropObj });
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return manageUpdateProp;
};
