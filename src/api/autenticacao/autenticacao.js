import axios from "axios";
import MD5 from "crypto-js/md5";
const baseUrl =
  "https://netflify-demo.netlify.app/.netlify/functions/api/autenticacao";
//const baseUrl = "http://localhost:9000/.netlify/functions/api/autenticacao";
const headersJson = {
  Authorization: "Basic MTEyMzQ1Njc4OTA6MDk4NzY1NDMyMTE=",
  "Content-Type": "application/json",
};

export default {
  get: async (table, user, password) => {
    var data = JSON.stringify({
      table,
      user: MD5(user).toString(),
      password: MD5(password).toString(),
    });

    const response = await axios({
      method: "POST",
      url: `${baseUrl}`,
      data: data,
      headers: headersJson,
    });

    return response.data;
  },
  reset: async (table, object) => {
    object.usuario = MD5(object.usuario).toString();
    object.senha = MD5(object.senha).toString();
    object.new_senha = MD5(object.new_senha).toString();
    object.ativo = 1;

    var data = JSON.stringify({
      table: table,
      object: object,
    });

    const response = await axios({
      method: "PUT",
      url: `${baseUrl}/reset`,
      data: data,
      headers: headersJson,
    });

    return response.data;
  },
};
