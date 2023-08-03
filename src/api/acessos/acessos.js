import axios from "axios";
//const baseUrl = "http://localhost:9000/.netlify/functions/api/acessos";
const baseUrl = `${process.env.VUE_APP_API_BASE_URL}/acessos`;

const headersJson = {
  Authorization: "Basic MTEyMzQ1Njc4OTA6MDk4NzY1NDMyMTE=",
  "Content-Type": "application/json",
};
import helpers from "../../helpers/session";
const user = helpers.getCurrentUser();

export default {
  get: async (page) => {
    var data = JSON.stringify({
      table: "acessos",
      id: user.usuario,
      page,
    });

    const response = await axios({
      method: "POST",
      url: `${baseUrl}`,
      data: data,
      headers: headersJson,
    });

    return response.data;
  },
};
