import Vue from "vue";
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const options = {
  position: "bottom-center",
  closeButton: false,
  hideProgressBar: true,
  closeOnClick: false,
  toastClassName: "custom-toast",
  bodyClassName: "custom-toast-body",
  rtl: true
};

Vue.use(Toast, options);
