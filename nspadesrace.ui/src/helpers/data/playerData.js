import axios from "axios";
import firebase from "firebase/app";
import "firebase/auth";
import { baseUrl } from "../constants.json";

axios.interceptors.request.use(
  (request) => {
    const token = sessionStorage.getItem("token");
    if (token != null) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  (error) => Promise.reject(error)
);

const getPlayerByFirebaseUid = (uid) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/player/fbid/${uid}`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });

const registerFirebaseAndDBUser = (email, passWord, userName) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, passWord)
    .then((cred) => {
      cred.user.getIdToken().then((token) => {
        sessionStorage.setItem("token", token)  
      })
      .then(() => {
        const playerToAdd = {
          userName: userName,
          email: email,
          firebaseUid: cred.user.uid,
        };
        addNewPlayer(playerToAdd);
      });
    });
};

const addNewPlayer = (user) => axios.post(`${baseUrl}/player`, user);

export default { registerFirebaseAndDBUser, getPlayerByFirebaseUid, addNewPlayer };
