import axios from "axios";
import { BASE_API_URL, lookups } from "./configs";
import * as firebase from "firebase";
import { CacheStore } from "./cacheStore";

export function getNearbyShop(location) {
  return getLastUpdatedShop();
}

export function clearCache(name){
  let cache = new CacheStore(name);
  cache.clearCache();
}

export async function getShopByCategory(category, pageNumber) {
  let cache = new CacheStore("getShopByCategory");
  let key = category + pageNumber;
  if(cache.hasCached(key)){
    console.log('cached hitted');     
    return cache.getCache(key);
  }
  else{
    console.log('cached missed');  
    const response = await axios.get(`${BASE_API_URL}/Shops/category/${category}/${pageNumber}`);
    cache.setCache(key, response);
    return response;
  }
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

export function getShopURL(shopId) {
  return "https://www.xn--72caaj3ctb1f7a9cc9fe5ff0x.com/redirect/" + shopId;
}

export async function uploadImage(file) {
  console.log(file);
  const storageRef = firebase.storage().ref();
  const imageRef = storageRef.child(`media/images/${Date.now()}.jpg`);
  await imageRef.put(file, { contentType: file.type });
  // Add resolution in name for supporting image resize extension
  let downloadURL = await imageRef.getDownloadURL();
  const filename = imageRef.name.split('.').slice(0, -1).join('.');
  const imageURL = downloadURL.replace(filename, filename + "_1920x1080");
  return imageURL;
}
