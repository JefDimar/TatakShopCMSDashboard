<template>
  <div>
  <b-navbar toggleable="lg" type="dark" variant="dark" fixed="top">
    <b-navbar-brand disabled v-if="statusLogged">CMS Dashboard</b-navbar-brand>
    <b-navbar-brand disabled v-if="!statusLogged">Login Page</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#" v-if="statusLogged">Home</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto" v-if="statusLogged">
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>{{ username }}</em>
          </template>
          <b-dropdown-item href="#" @click.prevent="logout">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      username: 'admin'
    }
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$store.dispatch('logout')
      this.$router.push('/')
    }
  },
  computed: {
    statusLogged () {
      return this.$store.state.isLoggedIn
    }
  },
  created () {
    if (localStorage.access_token) {
      this.$store.commit('SET_ISLOGGEDIN', true)
    }
  }
}
</script>

<style scoped>
</style>
