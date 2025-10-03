<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <div class="base-url-info">
      <p>Current Base URL: {{ baseUrl }}</p>
      <p>Environment: {{ environment }}</p>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
      baseUrl: import.meta.env.VITE_BASE_URL || '/',
      environment: import.meta.env.NODE_ENV || 'development'
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.base-url-info {
  margin-top: 40px;
  padding: 20px;
  background-color: #f0f2f5;
  border-radius: 8px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.base-url-info p {
  margin: 10px 0;
  font-size: 16px;
}

.base-url-info p:first-child {
  font-weight: bold;
  color: #1976d2;
}
</style>
