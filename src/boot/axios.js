import Vue from 'vue'
import axios from 'axios'

//axios.defaults.withCredentials = true

Vue.prototype.$axios = axios

const api = axios.create({
    baseURL: 'https://legendword.com/gallery/images'
})
Vue.prototype.$api = api

export { axios, api }