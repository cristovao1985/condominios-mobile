<template>
  <q-page class="q-ma-md">
    <h6>Dashboard</h6>
    <div class="row">
      <div class="col q-ma-sm">
        <q-select
          v-model="filter.ano"
          :options="anos"
          label="Ano base"
          required
        />
      </div>
      <div class="col q-ma-sm">
        <q-select
          v-model="filter.mes"
          :options="meses"
          label="Mês de referência"
          required
        />
      </div>
    </div>
    <div class="row">
      <q-card class="col q-ma-sm q-pa-sm">
        <strong class="text-primary">Condominos</strong>
        <br />
        {{ data.totalC }}
      </q-card>
      <q-card class="col q-ma-sm q-pa-sm">
        <strong class="text-negative">Despesas</strong>
        <br />
        R${{ data.totalD }}
      </q-card>
      <q-card class="col q-ma-sm q-pa-sm">
        <strong class="text-positive">Receitas</strong>
        <br />
        R${{ data.totalR }}
      </q-card>
      <q-card class="col q-ma-sm q-pa-sm">
        <strong>Saldo</strong>
        <br />
        R${{ data.totalR - data.totalD }}
      </q-card>
    </div>
  </q-page>
</template>

<script>
import dashboardApi from "../api/dashboard/dashboard.api";
export default {
  name: "Home",
  data() {
    return {
      data: { totalC: 0, totalD: 0, totalR: 0 },
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
      },
    };
  },
  created() {
    this.getDashboardData();
  },
  watch: {
    "filter.mes"() {
      this.getDashboardData();
    },
    "filter.ano"() {
      this.getDashboardData();
    },
  },
  methods: {
    async getDashboardData() {
      this.data = [];
      await dashboardApi
        .get(this.filter.ano, this.filter.mes)
        .then((result) => {
          this.data = result.data[0];
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
