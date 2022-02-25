import {
  firebaseDownloadURL,
  uploadListingPhotos,
} from "../firebase/firebaseService";

const promises = pictures.map((file) => {
  const ref = firebase.storage().ref().child(`img/upl/${file.data.name}`);
  return ref.put(file.uploadTask).then(() => ref.getDownloadURL());
});

Promise.all(promises)
  .then((fileDownloadUrls) => {
    db.collection("properties").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      title: title,
      description: description,
      pictures: fileDownloadUrls,
      user: user.uid,
    });
  })
  .catch((err) => console.log(err));

async function listingSubmitWithPhotos(files, values) {
  const user = auth.currentUser;
  const listingId = "fhui4y6t87w45";
  const promises = files.map((file) => {
    return uploadListingPhotos(file, file.name, listingId).then((ref) =>
      firebaseDownloadURL(ref.metadata.fullPath)
    );
  });

  Promise.all(promises).then((downloadURLs) => {
    addDoc(collection(db, "listings"), {
      title: values.title,
      listDetails: values.listDetails,
      tradeDetails: values.tradeDetails,
      availStart: values.availStart,
      availEnd: values.availEnd,
      location: {
        address: values.location.address,
        latLng: values.location.latLng,
      },
      lister: {
        displayName: user.displayName,
        uid: user.uid,
        photoURL:
          user.photoURL ||
          "https://ballstatepbs.org/wp-content/uploads/2019/07/generic-female-profile-picture-8.jpg",
      },
      created_at: serverTimestamp(),
    });
  });
}
