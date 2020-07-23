import axios from 'axios';
import { baseUrl } from "../constants.json";

const getHighestScoreByPlayerId = (id) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/score/${id}/highest`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });

  const getHighScoresByPlayerId = (id) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/score/${id}`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });

  const addScore = (scoreToAdd) => new Promise((resolve, reject) => {
    axios
      .post(`${baseUrl}/score`, scoreToAdd)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  }); 

export default { getHighestScoreByPlayerId, getHighScoresByPlayerId, addScore };
