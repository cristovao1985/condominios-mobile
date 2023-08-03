import axios from "axios";

const baseUrl = `${process.env.VUE_APP_API_BASE_URL}/dashboard`;
//const baseUrl = "http://localhost:9000/.netlify/functions/api/dashboard";
const headersJson = {
  Authorization: "Basic MTEyMzQ1Njc4OTA6MDk4NzY1NDMyMTE=",
  "Content-Type": "application/json",
};

export default {
  get: async (filter) => {
    const { data_ini, data_fim } = filter;
    var data = JSON.stringify({
      data_ini,
      data_fim,
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
