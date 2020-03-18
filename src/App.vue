<template>
  <div id="app">
    <div id="nav">
      <div class="menu">
      <router-link :to="base + '/'">{{ $t('main.nav.home') }}</router-link>&nbsp;|&nbsp; 
      <router-link :to="base + '/about'">{{ $t('main.nav.about') }}</router-link>
      </div>

      <div class="languages">
        <md-menu md-direction="bottom-end">
          <md-button md-menu-trigger>English</md-button>

          <md-menu-content>
            <md-menu-item :href="path">English</md-menu-item>
            <md-menu-item :href="'/fr' + path">French</md-menu-item>
          </md-menu-content>
        </md-menu>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import store from "./store";

export default {
  name: "App",
  data: function() {
    return {
      path: "/"
    };
  },
  computed: {
    base() {
      return store.getters.base;
    }
  },
  watch: {
    $route(to) {
      this.path = to.path.substring(this.base.length);
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
