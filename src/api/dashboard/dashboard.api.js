import axios from "axios";
//const baseUrl =
("https://netflify-demo.netlify.app/.netlify/functions/api/dashboard");
const baseUrl = "http://localhost:9000/.netlify/functions/api/dashboard";
const headersJson = {
  Authorization: "Basic MTEyMzQ1Njc4OTA6MDk4NzY1NDMyMTE=",
  "Content-Type": "application/json",
};

export default {
  get: async (year, month) => {
    var data = JSON.stringify({
      year,
      month,
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
