<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{name: 'count-down-timer'}">CountDown</router-link>
      <router-link :to="{name: 'movie-search'}">MovieSearch</router-link>
      <router-link :to="{name: 'github-profile-viewer'}">GithubProfile</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
}
body {
  margin: 0;
}

#nav {
  padding: 30px;
  background-color: #2c3e50;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

#nav a {
  font-weight: bold;
  color: #eeeeee;
  margin-left: 13px;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
  * {
    box-sizing: border-box;
  }
</style>
