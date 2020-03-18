import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store';
import i18n from '../i18n';
import axios from 'axios';

Vue.use(VueRouter);

import routes from './routes';

const allowedLocales = ['en', 'fr'];

// Creates regex (en|fr)
function getLocaleRegex() {
  let reg = '';
  allowedLocales.forEach((route, index) => {
    reg = `${reg}${route}${index !== allowedLocales.length - 1 ? '|' : ''}`;
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
