<template>
  <div id="app" data-app>
    <div id="nav" v-if="locale">
      <div class="menu">
        <router-link :to="base + '/'">{{ $t('main.nav.home') }}</router-link>&nbsp;|&nbsp;
        <router-link :to="base + '/about'">{{ $t('main.nav.about') }}</router-link>
      </div>

      <div class="languages">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on">
              <flag :iso="selectedLanguage.flag" />
              {{ $t('main.nav.languages.' + selectedLanguage.code) }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(language, index) in languages"
              :key="index"
              :href="language.base + path"
            >
              <v-list-item-title>
                <flag :iso="language.flag" />
                {{ $t('main.nav.languages.' + language.code) }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import store from "./store";
import { SUPPORTED_LOCALES } from './constants/locale';

export default {
  name: "App",
  data: function() {
    return {
      path: "/",
      languages: SUPPORTED_LOCALES,
      selectedLanguage: {}
    };
  },
  computed: {
    base() {
      return store.getters.base;
    },
    locale() {
      return store.getters.locale;
    }
  },
  watch: {
    $route(to) {
      this.path = to.path.substring(this.base.length);
    },
    locale: {
      immediate: true,
      handler(newVal) {
        this.selectedLanguage = this.languages.find(
          lang => lang.code === newVal
        );
      }
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
  position: relative;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }

  .languages {
    position: absolute;
    right: 30px;
    top: 22px;
  }
}
</style>
