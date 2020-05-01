import axios from "axios";
import { BASE_API_URL } from "./configs";

export function getNearbyShop(location) {
  return axios
    .get(`${BASE_API_URL}/shop/nearby?lat=${location.lat}&lng=${location.lng}`)
    .then(response => response.data)
    .catch(error => console.log(error));
}

export function getShops() {
  return axios
    .get(`${BASE_API_URL}/shop`)
    .then(response => response.data)
    .catch(error => console.log(error));
}

export function getShopById(id) {
  return axios
    .get(`${BASE_API_URL}/shop/${id}`)
    .then(response => response.data)
    .catch(error => console.log(error));
}

export function getOwnedShop(uid) {
  return axios
    .get(`${BASE_API_URL}/shop/owned?id=${uid}`)
    .then(response => response.data)
    .catch(error => console.log(error));
}

export function getShopByUser(uid) {
  return axios.get(`${BASE_API_URL}/shop/user/${uid}`);
}

export function addNewShop(shop) {
  return axios.post(`${BASE_API_URL}/shop/`, shop);
}

export function updateShop(id, shop) {
  return axios.put(`${BASE_API_URL}/shop/${id}`, shop);
}

export function getUserById(id) {
  return axios.get(`${BASE_API_URL}/user/${id}`);
}

export function addNewUser(user) {
  return axios.post(`${BASE_API_URL}/user/`, user);
}
