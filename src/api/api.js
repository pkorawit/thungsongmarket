import axios from "axios";
import { BASE_API_URL, lookups } from "./configs";

export function getNearbyShop(location) {
  return getLastUpdatedShop()
}

export function getShopByCategory(category) {
  return axios
    .get(`${BASE_API_URL}/Shops/category/${category}`);
}

export function getLastUpdatedShop() {
  return axios
    .get(`${BASE_API_URL}/Shops/search/updated`);
}

export function getShops() {
  return axios
    .get(`${BASE_API_URL}/Shops`);
}

export function getShopById(id) {
  return axios
    .get(`${BASE_API_URL}/Shops/${id}`);
}

export function getOwnedShop(uid) {
  return axios
    .get(`${BASE_API_URL}/shop/owned?id=${uid}`);
}

export function authorizeShop(id, status) {
  return axios
    .put(`${BASE_API_URL}/api/Shops/${id}/authorize/${status}`);
}

export function getShopByUser(uid) {
  return axios.get(`${BASE_API_URL}/shop/user/${uid}`);
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

export function getCategory() {
  return lookups.categories;
}

export function getServiceType() {
  return lookups.serviceTypes;
}

export function getPaymentType() {
  return lookups.paymentTypes;
}
