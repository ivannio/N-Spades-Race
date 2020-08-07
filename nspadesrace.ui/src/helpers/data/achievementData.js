import axios from "axios";
import { baseUrl } from "../constants.json";

const getAchievements = () =>
  new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/achievement`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });

const getAchievedByPlayerId = (id) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/playerachieved/${id}`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });

const checkConsistentlyQuick = (playerId) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/playerachieved/checkcq/${playerId}`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });

const checkDoubleDigits = (playerId) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/playerachieved/checkdd/${playerId}`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });

const checkLeaderboardMaterial = (playerId) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/playerachieved/checklm/${playerId}`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });

const addPlayerAchieved = (playerAchievedToAdd) =>
  new Promise((resolve, reject) => {
    axios
      .post(`${baseUrl}/playerachieved`, playerAchievedToAdd)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });

export default {
  getAchievements,
  getAchievedByPlayerId,
  addPlayerAchieved,
  checkConsistentlyQuick,
  checkDoubleDigits,
  checkLeaderboardMaterial,
};
