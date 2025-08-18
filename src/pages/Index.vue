<template>
  <q-page class="q-ma-md">
    <q-item>
      <q-item-section top avatar>
        <q-avatar square size="80px">
          <img :src="condominio.logo" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <p>
          <strong>{{ condominio.nome }} </strong> <br />
          CNPJ {{ condominio.cnpj }}
          <br />
          {{ condominio.logradouro }}, nº {{ condominio.numero }} -
          {{ condominio.bairro }}, {{ condominio.cidade }} -
          {{ condominio.uf }} - CEP {{ condominio.cep }}
        </p>
      </q-item-section>
    </q-item>
    <br />
    <q-banner class="bg-primary text-white" rounded>
      <span class="text-h6"> Olá, </span>
      <strong class="text-h6">
        {{ condomino.nome }}
      </strong>
    </q-banner>
    <br />
    <q-list bordered>
      <q-item clickable v-ripple @click="navigateTo('lancamentos')">
        <q-item-section avatar>
          <q-icon color="primary" name="attach_money" />
        </q-item-section>
        <q-item-section>Lançamentos em meu nome</q-item-section>
      </q-item>
      <q-separator />
      <q-item clickable v-ripple @click="navigateTo('veiculos')">
        <q-item-section avatar>
          <q-icon color="primary" name="drive_eta" />
        </q-item-section>
        <q-item-section>Meus veículos</q-item-section>
      </q-item>
      <q-separator />
      <q-item clickable v-ripple @click="navigateTo('relatorios')">
        <q-item-section avatar>
          <q-icon color="primary" name="request_page" />
        </q-item-section>
        <q-item-section>Prestação de contas</q-item-section>
      </q-item>
      <q-separator />
      <q-item clickable v-ripple @click="navigateTo('ocorrencias')">
        <q-item-section avatar>
          <q-icon color="primary" name="warning_amber" />
        </q-item-section>
        <q-item-section>Livro de ocorrências e notícias</q-item-section>
      </q-item>
      <q-separator />
      <q-item clickable v-ripple @click="navigateTo('manutencoes')">
        <q-item-section avatar>
          <q-icon color="primary" name="handyman" />
        </q-item-section>
        <q-item-section>Serviços e manutenções</q-item-section>
      </q-item>
      <q-separator />
      <q-item clickable v-ripple @click="navigateTo('perfil')">
        <q-item-section avatar>
          <q-icon color="primary" name="settings" />
        </q-item-section>
        <q-item-section>Meus Dados</q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import dashboardApi from "../api/dashboard/dashboard.api";
import baseApi from "src/api/base/base.api";
import formaters from "../helpers/formaters";
export default {
  name: "Home",
  data() {
    return {
      data: { totalC: 0, totalD: 0, totalR: 0, totalV: 0, totalM: 0 },
      meses: [
        "JANEIRO",
        "FEVEREIRO",
        "MARÇO",
        "ABRIL",
        "MAIO",
        "JUNHO",
        "JULHO",
        "AGOSTO",
        "SETEMBRO",
        "OUTUBRO",
        "NOVEMBRO",
        "DEZEMBRO",
      ],
      anos: [2022, 2023, 2024],
      filter: {
        ano: new Date().getFullYear(),
        mes: new Date()
          .toLocaleString("pt-br", { month: "long" })
          .toUpperCase(),
        data_ini: new Date().toISOString().split("T")[0],
        data_fim: new Date().toISOString().split("T")[0],
      },
      ocorrencia: {},
      manutencao: {},
      condomino: JSON.parse(localStorage.getItem("morador")),
      condominio: {},
    };
  },
  async created() {
    this.getCondominio();
  },
  watch: {
    "filter.data_ini"() {
      this.getDashboardData();
    },
    "filter.data_fim"() {
      this.getDashboardData();
    },
  },
  methods: {
    async getDashboardData() {
      this.data = [];
      await dashboardApi
        .get(this.filter)
        .then((result) => {
          this.data = result.data[0];
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getOcorrencia() {
      baseApi
        .get("ocorrencias", "id")
        .then((result) => {
          if (result.success) {
            this.ocorrencia = result.data[result.data.length - 1];
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getManutencao() {
      baseApi
        .get("manutencoes", "id")
        .then((result) => {
          if (result.success) {
            this.manutencao = result.data[result.data.length - 1];
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    dateFormat(date) {
      if (date) {
        return formaters.date(date);
      }
    },
    setFilterDates() {
      var date = new Date(),
        y = date.getFullYear(),
        m = date.getMonth();
      var firstDay = new Date(y, m, 1);
      var lastDay = new Date(y, m + 1, 0);

      this.filter.data_ini = firstDay.toISOString().split("T")[0];
      this.filter.data_fim = lastDay.toISOString().split("T")[0];
    },
    getCondominio() {
      const morador = JSON.parse(localStorage.getItem("morador"));
      baseApi
        .getById("tenants", morador.tenant)
        .then((res) => {
          this.condominio = res.data[0];
        })
        .catch((error) => {
          console.log(error);
        });
    },
    navigateTo(path) {
      this.$router.push({ name: path });
    },
  },
};
</script>
