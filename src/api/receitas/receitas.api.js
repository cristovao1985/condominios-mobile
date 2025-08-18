import axios from "axios";
import helpers from "../../helpers/session";
const user = await helpers.getCurrentUser();
const baseUrl = `${process.env.VUE_APP_API_BASE_URL}/base`;
const baseReceitasUrl = `${process.env.VUE_APP_API_BASE_URL}/receitas`;
const headersJson = {
  Authorization: "Basic MTEyMzQ1Njc4OTA6MDk4NzY1NDMyMTE=",
  "Content-Type": "application/json",
  'X-Tenant': user?.tenant
};

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
      url: `${baseReceitasUrl}`,
      data: data,
      headers: headersJson,
    });

    return response.data;
  },
  getById: async (table, id) => {
    var data = JSON.stringify({
      table,
    });

    const response = await axios({
      method: "POST",
      url: `${baseUrl}/id/${id}`,
      data: data,
      headers: headersJson,
    });

    return response.data;
  },
  insert: async (table="receitas", object) => {
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
  getDashboard: async (table, filter) => {
    const { data_ini, data_fim } = filter;
    var data = JSON.stringify({
      table,
      data_ini,
      data_fim,
    });

    const response = await axios({
      method: "POST",
      url: `${baseReceitasUrl}/dashboard`,
      data: data,
      headers: headersJson,
    });

    return response.data;
  },
    getLancamentosMorador: async (table, id) => {
    var data = JSON.stringify({
      table,
      id_condomino: user.id
    });

    const response = await axios({
      method: "POST",
      url: `${baseReceitasUrl}/receitas-morador`,
      data: data,
      headers: headersJson,
    });

    return response.data;
  },
};
