<template>
  <div class="container-fluid">
    <b-card class="container bg-light d-flex justify-content-center align-item-center w-25 mt-5">
      <h1>Welcome to CMS for E-Commerce</h1>
      <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
        <b-form-group
          id="input-group-1"
          label="Email address:"
          label-for="input-1"
          description="We'll never share your email with anyone else."
        >
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            placeholder="Email address"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Password:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.password"
            type="password"
            placeholder="Password"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit () {
      const input = {
        email: this.form.email,
        password: this.form.password
      }
      this.$store.dispatch('login', input)
      this.form.email = ''
      this.form.password = ''
    },
    onReset () {
      this.form.email = ''
      this.form.password = ''
    }
  }
}
</script>

<style scoped>
</style>
