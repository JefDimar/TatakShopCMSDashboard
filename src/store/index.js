import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api/axios'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    access_token: '',
    error: ''
  },
  mutations: {
    SET_ACCESS_TOKEN (state, token) {
      state.access_token = token
    },
    SET_ERROR (state, err) {
      state.error = err
    }
  },
  actions: {
    login (context, input) {
      axios.post('/login', {
        email: input.email,
        password: input.password
      })
        .then(token => {
          console.log(token)
          context.commit('SET_ACCESS_TOKEN', token.access_token)
          localStorage.access_token = token.access_token
          Swal.fire({
            text: token.message,
            icon: 'success',
            showConfirmButton: false
          })
          this.$router.push('/mainPage')
        })
        .catch(({ response }) => {
          context.commit('SET_ERROR', response.data.message)
          Swal.fire({
            title: 'Unauthorized!',
            text: response.data.message,
            icon: 'error',
            showConfirmButton: false
          })
        })
    }
  },
  modules: {
  }
})
