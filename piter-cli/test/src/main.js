import './public-path';
import Vue, { install } from '@tuns/core';
import routes from '../.route';
import '@/assets/style/tailwind.css';
Vue.use(install, {
  publicPath: '',
  Router: {
    routes,
    beforeEach(to, from, next, http) {
      console.log(to, from, next, http);
      next();
    }
  },
  netWork: {}
});
