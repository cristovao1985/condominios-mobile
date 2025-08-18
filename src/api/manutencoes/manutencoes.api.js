import axios from "axios";
const baseUrl = `${process.env.VUE_APP_API_BASE_URL}/manutencoes`;
import helpers from "../../helpers/session";
const user = await helpers.getCurrentUser();

const headersJson = {
  Authorization: "Basic MTEyMzQ1Njc4OTA6MDk4NzY1NDMyMTE=",
  "Content-Type": "application/json",
    'X-Tenant': user?.tenant
};

export default {
  get: async (table) => {
    var data = JSON.stringify({
      table,
      id_condomino: user.id,
    });

    const response = await axios({
      method: "POST",
      url: `${baseUrl}/manutencoes-morador`,
      data: data,
      headers: headersJson,
    });

    return response.data;
  },
  insert: async (table, object) => {
    object.usuario = user.nome;
    object.id_condominio = await user?.tenant;

    var data = JSON.stringify({
      table: table,
      object: object,
    });

    const response = await axios({
      method: "POST",
      url: `${baseUrl}/insert`,
      data: data,
      headers: headersJson,
    });

    return response.data;
  },
  update: async (table, object) => {
    var data = JSON.stringify({
      table: table,
      object: object,
    });

    const response = await axios({
      method: "PUT",
      url: `${baseUrl}/update`,
      data: data,
      headers: headersJson,
    });

    return response.data;
  },
  remove: async (table, object) => {
    var data = JSON.stringify({
      table: table,
      object: object,
    });

    const response = await axios({
      method: "DELETE",
      url: `${baseUrl}/remove`,
      data: data,
      headers: headersJson,
    });

    return response.data;
  },
};
