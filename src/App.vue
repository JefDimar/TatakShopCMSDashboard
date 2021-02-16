<template>
  <div id="app">
    <Navbar/>

    <LandingPage/>

    <MainPage/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import LandingPage from './views/LandingPage'
import MainPage from './views/MainPage'

export default {
  name: 'App',
  components: {
    Navbar,
    LandingPage,
    MainPage
  },
  data () {
    return {}
  },
  methods: {
  }
}
</script>

<style>
body {
  background-image: linear-gradient(to right, #373B44, #4286f4);
}
</style>
