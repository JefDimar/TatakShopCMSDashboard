import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api/axios'
import router from '../router'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    products: []
  },
  mutations: {
    SET_ISLOGGEDIN (state, data) {
      state.isLoggedIn = data
    },
    FETCH_PRODUCTS (state, data) {
      state.products = data
    }
  },
  actions: {
    login (context, input) {
      axios.post('/login', {
        email: input.email,
        password: input.password
      })
        .then(({ data }) => {
          localStorage.access_token = data.access_token
          Swal.fire({
            text: data.message,
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          })
          router.push('/mainPage')
          context.commit('SET_ISLOGGEDIN', true)
        })
        .catch(({ response }) => {
          Swal.fire({
            title: 'Unauthorized!',
            text: response.data.message,
            icon: 'error',
            showConfirmButton: false,
            timer: 2000
          })
        })
    },
    logout (context) {
      context.commit('SET_ISLOGGEDIN', false)
    },
    fetchProducts (context) {
      axios.get('/products', {
        headers: { access_token: localStorage.access_token }
      })
        .then(({ data }) => {
          context.commit('FETCH_PRODUCTS', data)
        })
        .catch(({ response }) => {
          console.log(response.data)
        })
    }
  },
  modules: {
  }
})
