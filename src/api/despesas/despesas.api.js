import axios from "axios";
const baseUrl = `${process.env.VUE_APP_API_BASE_URL}/base`;
const baseDespesasUrl = `${process.env.VUE_APP_API_BASE_URL}/despesas`;
const headersJson = {
  Authorization: "Basic MTEyMzQ1Njc4OTA6MDk4NzY1NDMyMTE=",
  "Content-Type": "application/json",
};
import helpers from "../../helpers/session";
const user = helpers.getCurrentUser();

export default {
  get: async (table, order, year, month) => {
    var data = JSON.stringify({
      table,
      order,
      year,
      month,
    });

    const response = await axios({
      method: "POST",
      url: `${baseDespesasUrl}`,
      data: data,
      headers: headersJson,
    });

    return response.data;
  },
  insert: async (table, object) => {
    object.usuario = user.nome;
    object.id_condominio = await user.tenant;
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
  getDashboard: async (table, filter) => {
    const { data_ini, data_fim } = filter;
    var data = JSON.stringify({
      table,
      data_ini,
      data_fim,
    });

    const response = await axios({
      method: "POST",
      url: `${baseDespesasUrl}/dashboard`,
      data: data,
      headers: headersJson,
    });

    return response.data;
  },
};
