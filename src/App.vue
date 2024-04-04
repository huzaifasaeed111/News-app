<template>
  <div id="app">
    <NavBar/>
    <NewsLists/>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import NewsLists from './components/NewsLists.vue'
export default {
  name: 'App',
  components: {
    NavBar,
    NewsLists
  }
}
</script>

