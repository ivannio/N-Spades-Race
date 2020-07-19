import firebase from "firebase/app";
import "firebase/auth";

const logOut = () => {
    firebase.auth().signOut()
    .then(() => {
        sessionStorage.clear();
      }).catch((error) => console.error("error logging out", error));
}

export default { logOut };