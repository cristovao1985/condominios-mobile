import { Notify } from "quasar";

export default {
  showToast: (message, color) => {
    Notify.create({
      message,
      color,
      timeout: 5000,
      type:color
    });
  },
};
