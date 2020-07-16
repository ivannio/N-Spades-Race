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

const getPlayerById = (id) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/player/${id}`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });

const registerFirebaseUser = (email, password) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((cred) => {
      cred.user.getIdToken().then((token) => {
        sessionStorage.setItem("token", token);
      });
    });
};

const addNewPlayer = (user) => axios.post(`${baseUrl}/player}`, user);

export default { getPlayerById, addNewPlayer, registerFirebaseUser };
