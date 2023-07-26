<template>
  <q-page class="q-ma-md">
    <h6>Dashboard</h6>
    <div class="row">
      <div class="col q-ma-sm">
        <!-- <q-select
          v-model="filter.ano"
          :options="anos"
          label="Ano base"
          required
        /> -->
        <q-input
          v-model="filter.data_ini"
          label="Data inicial"
          type="date"
          required
        />
      </div>
      <div class="col q-ma-sm">
        <!-- <q-select
          v-model="filter.mes"
          :options="meses"
          label="Mês de referência"
          required
        /> -->
        <q-input
          v-model="filter.data_fim"
          label="Data fim"
          type="date"
          required
        />
      </div>
    </div>

    <div class="row">
      <q-card class="col q-ma-sm q-pa-sm text-center">
        <q-btn flat color="negative" label="Despesas" to="/despesas" />
        <br />
        R${{ data.totalD }}
      </q-card>
      <q-card class="col q-ma-sm q-pa-sm text-center">
        <q-btn flat color="positive" label="Receitas" to="/receitas" />
        <br />
        R${{ data.totalR }}
      </q-card>
      <q-card class="col q-ma-sm q-pa-sm text-center">
        <q-btn flat label="Saldo" />
        <br />
        R${{ (data.totalR - data.totalD).toFixed(2) }}
      </q-card>
    </div>
    <div class="row">
      <q-card class="col q-ma-sm q-pa-sm text-center">
        <q-btn flat color="primary" label="Condôminos" to="/condominos" />
        <br />
        {{ data.totalC }}
      </q-card>
      <q-card class="col q-ma-sm q-pa-sm text-center">
        <q-btn flat color="Secondary" label="Veículos" to="/veiculos" />
        <br />
        {{ data.totalV }}
      </q-card>
    </div>
    <div v-if="ocorrencia">
      <q-expansion-item
        class="red"
        expand-separator
        icon="warning_amber"
        :label="ocorrencia.titulo"
        :caption="`${ocorrencia.usuario} - ${dateFormat(ocorrencia.data)}`"
      >
        <q-card>
          <q-card-section>
            <div v-html="ocorrencia.descricao"></div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </div>
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
      data: { totalC: 0, totalD: 0, totalR: 0, totalV: 0 },
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
        data_ini: "",
        data_fim: "",
      },
      ocorrencia: {},
    };
  },
  created() {
    this.getDashboardData();
    this.getOcorrencia();
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
    dateFormat(date) {
      return formaters.date(date);
    },
  },
};
</script>
