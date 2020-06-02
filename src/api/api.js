import axios from "axios";
import { BASE_API_URL, lookups } from "./configs";
import * as firebase from "firebase";

export function getNearbyShop(location) {
  return getLastUpdatedShop();
}

export function getShopByCategory(category, pageNumber) {
  return axios.get(`${BASE_API_URL}/Shops/category/${category}/${pageNumber}`);
}

export function getAllLastUpdatedShop() {
  return axios.get(`${BASE_API_URL}/Shops/search/updated`);
}

export function getLastUpdatedShop(pageNumber) {
  return axios.get(`${BASE_API_URL}/Shops/search/updated/${pageNumber}`);
}

export function searchShopByKeyword(keyword, pageNumber) {
  return axios.get(
    `${BASE_API_URL}/Shops/search/keyword/${keyword}/${pageNumber}`
  );
}

export function getShops() {
  return axios.get(`${BASE_API_URL}/Shops`);
}

export function getShopById(id) {
  return axios.get(`${BASE_API_URL}/Shops/${id}`);
}

export function getOwnedShop(uid) {
  return axios.get(`${BASE_API_URL}/Shops/search/owner/${uid}`);
}

export function getAuthorizedShop() {
  return axios.get(`${BASE_API_URL}/Shops/search/authorized/`);
}

export function getPendingShop() {
  return axios.get(`${BASE_API_URL}/Shops/search/pending/`);
}

export function getShopByUser(uid) {
  return axios.get(`${BASE_API_URL}/Shops/search/owner/${uid}`);
}

export function setAuthorizeStatus(id, status) {
  return axios.put(`${BASE_API_URL}/Shops/${id}/authorize/${status}`);
}

export function setShopStatus(id, status) {
  return axios.put(`${BASE_API_URL}/Shops/${id}/status/${status}`);
}

export function addNewShop(shop) {
  return axios.post(`${BASE_API_URL}/Shops/`, shop);
}

export function updateShop(id, shop) {
  return axios.put(`${BASE_API_URL}/Shops/${id}`, shop);
}

export function getUserById(id) {
  return axios.get(`${BASE_API_URL}/Shops/${id}`);
}

export function addNewUser(user) {
  return axios.post(`${BASE_API_URL}/Shops/`, user);
}

export function getCategories() {
  return lookups.categories;
}

export function getServiceType() {
  return lookups.serviceTypes;
}

export function getPaymentType() {
  return lookups.paymentTypes;
}

export async function uploadImage(file) {
  console.log(file);
  const storageRef = firebase.storage().ref();
  const imageRef = storageRef.child(`media/images/${Date.now()}.jpg`);
  await imageRef.put(file, { contentType: file.type });
  return imageRef.getDownloadURL();
}
