import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";
axios.defaults.withCredentials = true;
import routes from "./routes";
import VueCookies from "vue-cookies";
import VueSessionStorage from 'vue-sessionstorage';
Vue.use(VueCookies);
Vue.use(VueSessionStorage);
import VueRouter from "vue-router";
Vue.use(VueRouter);
const router = new VueRouter({
  routes,
});


router.beforeEach((to, from, next) => {
  // if the user logged in and than the cookie expired thus the local storage contains username but there is no cookie
  console.log("cookie" + Vue.$cookies.get("session"));
  if (shared_data.username !== undefined && !Vue.$cookies.get("session")){
      // logout force
    shared_data.logout();
    // redirect to home page
    if (to.name!=='main')
      next({ name: 'main' });
    else
      next();
  } else {
    next();
  }
});

import Vuelidate from "vuelidate";
//import Multiselect from 'vue-multiselect';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
  AvatarPlugin
} from "bootstrap-vue";
[
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
  AvatarPlugin
].forEach((x) => Vue.use(x));
Vue.use(Vuelidate);
//Vue.component(Multiselect);
axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

const shared_data = {
  username: localStorage.username,
  recipes_info: {},
  profilePic: localStorage.profilePic,
  login(username,imageUrl) {
    localStorage.setItem("username", username);
    this.username = username;
    console.log("login", this.username);
    this.profilePic = imageUrl;
  },
  logout() {
    console.log("logout");
    localStorage.removeItem("username");
    localStorage.removeItem("profilePic");
    Vue.$cookies.remove("session");
    this.username = undefined;
    this.profilePic = "";
  },
  prefixURL: "http://localhost:3000"
};
console.log(shared_data);
// Vue.prototype.$root.store = shared_data;

new Vue({
  router,
  data() {
    return {
      store: shared_data,
    };
  },
  methods: {
    toast(title, content, variant = null, append = false) {
      this.$bvToast.toast(`${content}`, {
        title: `${title}`,
        toaster: "b-toaster-top-center",
        variant: variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000,
      });
    },
  },
  render: (h) => h(App),
}).$mount("#app");
