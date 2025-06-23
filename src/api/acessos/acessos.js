import axios from "axios";
const baseUrl = `${process.env.VUE_APP_API_BASE_URL}/acessos`;

import helpers from "../../helpers/session";
const user = helpers.getCurrentUser();
const headersJson = {
  Authorization: "Basic MTEyMzQ1Njc4OTA6MDk4NzY1NDMyMTE=",
  "Content-Type": "application/json",
  "X-Tenant": user?.tenant,
};

export default {
  get: async (page) => {
    var data = JSON.stringify({
      table: "acessos",
      id: user.usuario,
      page,
    });

    const response = await axios({
      method: "POST",
      url: `${baseUrl}/page`,
      data: data,
      headers: headersJson,
    });

    return response.data;
  },
};
