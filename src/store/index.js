import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api/axios'
import router from '../router'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    products: [],
    product: {}
  },
  mutations: {
    SET_ISLOGGEDIN (state, data) {
      state.isLoggedIn = data
    },
    FETCH_PRODUCTS (state, data) {
      state.products = data
    },
    ADD_PRODUCT (state, data) {
      state.products.push(data)
    },
    POPULATE_FORM (state, data) {
      state.product = data
    },
    DELETE_PRODUCT (state, id) {
      state.products = state.products.filter(product => product.id !== id)
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
            timer: 5000
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
    },
    addProduct (context, data) {
      axios({
        url: '/products',
        method: 'POST',
        data: {
          name: data.name,
          image_url: data.image_url,
          price: data.price,
          stock: data.stock
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          context.commit('ADD_PRODUCT', data)
        })
        .catch(({ response }) => {
          Swal.fire({
            title: 'Unauthorized!',
            text: response.data.message,
            icon: 'error',
            showConfirmButton: false,
            timer: 5000
          })
        })
    },
    populateForm (context, id) {
      axios({
        url: `/products/${id}`,
        method: 'GET',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          // console.log(data)
          context.commit('POPULATE_FORM', data)
        })
        .catch(({ response }) => {
          Swal.fire({
            title: 'Unauthorized!',
            text: response.data.message,
            icon: 'error',
            showConfirmButton: false,
            timer: 5000
          })
        })
    },
    deleteProduct (context, id) {
      Swal.fire({
        title: 'Do you really want to delete this product?',
        icon: 'warning',
        showDenyButton: true,
        confirmButtonText: 'Confirm',
        denyButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          axios({
            url: `/products/${id}`,
            method: 'DELETE',
            headers: {
              access_token: localStorage.access_token
            }
          })
            .then(({ data }) => {
              Swal.fire({
                title: 'Success',
                icon: 'success',
                text: data.message,
                showConfirmButton: false,
                timer: 2000
              })
              context.commit('DELETE_PRODUCT', id)
            })
            .catch(({ response }) => {
              Swal.fire({
                title: 'Unauthorized!',
                text: response.data.message,
                icon: 'error',
                showConfirmButton: false,
                timer: 5000
              })
            })
        } else if (result.isDenied) {
          Swal.fire('Product not deleted', '', 'info')
        }
      })
    },
    editProduct (context, data) {
      axios({
        url: `/products/${data.id}`,
        method: 'PUT',
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          name: data.name,
          image_url: data.image_url,
          price: data.price,
          stock: data.stock
        }
      })
        .then(({ data }) => {
          Swal.fire({
            title: 'Success',
            text: data.message,
            icon: 'success',
            showConfirmButton: false,
            timer: 4000
          })
          context.dispatch('fetchProducts')
        })
        .catch(({ response }) => {
          Swal.fire({
            title: 'Unauthorized!',
            text: response.data.message,
            icon: 'error',
            showConfirmButton: false,
            timer: 5000
          })
        })
    }
  },
  modules: {
  }
})
