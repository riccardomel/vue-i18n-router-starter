import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store';
import i18n from '../plugins/i18n';
import axios from 'axios';

Vue.use(VueRouter);

import routes from './routes';

import { SUPPORTED_LOCALES } from '../constants/locale';

// Creates regex (en|fr)
function getLocaleRegex() {
  let reg = '';
  SUPPORTED_LOCALES.forEach((locale, index) => {
    reg = `${reg}${locale.code}${index !== SUPPORTED_LOCALES.length - 1 ? '|' : ''}`;
  });
  return `(${reg})`;
}

// Returns locale configuration
function getLocale(locale = 'en') {
  return SUPPORTED_LOCALES.find(loc => loc.code === locale);
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: `/:locale${getLocaleRegex()}?`,
    component: {
      template: '<router-view></router-view>'
    },
    beforeEnter(to, from, next) {
      const locale = getLocale(to.params.locale);
      store.dispatch('setLocale', locale);
      axios.get(locale.translations).then(res => {
        i18n.setLocaleMessage(locale.code, res.data || {});
      }).catch(() => {
        // TODO handle error
      }).finally(() => {
        i18n.locale = locale.code;
        next();
      });
    },
    children: routes
  }]
});

export default router
