import Vue from 'vue'
import axios from 'axios'
import servicesConfig from '../../services.conf'
Vue.prototype.$axios = axios.create({
    baseURL: servicesConfig.backendAPIs,
    headers: {'Content-Type': 'application/json', 'accept': 'application/json'}
});
