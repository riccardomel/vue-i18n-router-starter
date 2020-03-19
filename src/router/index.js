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

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: `/:locale${getLocaleRegex()}?`,
    component: {
      template: '<router-view></router-view>'
    },
    beforeEnter(to, from, next) {
      const locale = to.params.locale || 'en';
      const base = to.params.locale ? `/${to.params.locale}` : '';
      if (locale) {
        store.dispatch('setLocale', {
          locale,
          base
        });
      }

      axios.get(`/translations/${locale}.json`).then(res => {
        i18n.setLocaleMessage(locale, res.data || {});
      }).catch(() => {
        // TODO handle error
      }).finally(() => {
        i18n.locale = locale;
        next();
      });
    },
    children: routes
  }]
});

export default router
