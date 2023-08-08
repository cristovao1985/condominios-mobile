<template>
  <q-page class="q-ma-md">
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
          clearable
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
          clearable
        />
      </div>
    </div>
    <div class="row">
      <div class="col q-ma-sm">
        <h6>Receitas</h6>
        <TableReceitas :data="receitas" />
        <!-- <table>
          <tr>
            <th>Data</th>
            <th>Descrição</th>
            <th>Valor</th>
          </tr>
          <tr v-for="item in receitas" :key="item.id">
            <td>
              {{ item.data_pagamento }}
            </td>
            <td>
              {{ item.descricao }}
            </td>
            <td>
              {{ item.valor }}
            </td>
          </tr>
        </table> -->
      </div>
      <div class="col q-ma-sm">
        <h6>Despesas</h6>
        <TableDespesas :data="despesas" />
        <!-- <table>
          <tr>
            <th>Data</th>
            <th>Descrição</th>
            <th>Valor</th>
          </tr>
          <tr v-for="item in despesas" :key="item.id">
            <td>
              {{ item.data_pagamento }}
            </td>
            <td>
              {{ item.descricao }}
            </td>
            <td>
              {{ item.valor }}
            </td>
          </tr>
        </table> -->
      </div>
    </div>
    <div class="row justify-between bg-grey-3 q-pa-sm">
      <div>
        <strong>TOTAL RECEITAS: R$ {{ sumReceitas }}</strong>
      </div>
      <div>
        <strong>TOTAL DESPESAS: R$ {{ sumDespesas }}</strong>
      </div>
      <div>
        <strong>SALDO : R$ {{ (sumReceitas - sumDespesas).toFixed(2) }}</strong>
      </div>
    </div>
    <div class="q-mt-md">
      <q-btn
        label="Gerar prestação de contas"
        class="full-width"
        color="primary"
        v-if="showPrintButton"
        @click="openRelatorio"
      />
    </div>
  </q-page>
</template>
<script>
import receitasApi from "src/api/receitas/receitas.api";
import despesasApi from "src/api/despesas/despesas.api";
import TableDespesas from "./components/TableDespesas";
import TableReceitas from "./components/TableReceitas";
export default {
  name: "IndexPage",
  components: {
    TableDespesas,
    TableReceitas,
  },
  data() {
    return {
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
      receitas: [],
      despesas: [],
    };
  },
  watch: {
    "filter.data_ini"() {
      this.getDespesas();
      this.getReceitas();
    },
    "filter.data_fim"() {
      this.getDespesas();
      this.getReceitas();
    },
  },
  created() {
    this.setFilterDates();
    this.getDespesas();
    this.getReceitas();
  },
  computed: {
    sumDespesas() {
      return this.despesas.reduce((accumulator, object) => {
        return accumulator + parseFloat(object.valor);
      }, 0);
    },
    sumReceitas() {
      return this.receitas.reduce((accumulator, object) => {
        return accumulator + parseFloat(object.valor);
      }, 0);
    },
    showPrintButton() {
      return this.despesas.length && this.receitas.length;
    },
  },
  methods: {
    async getDespesas() {
      despesasApi
        .getDashboard("despesas", this.filter)
        .then((result) => {
          this.despesas = result.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getReceitas() {
      receitasApi
        .getDashboard("receitas", this.filter)
        .then((result) => {
          this.receitas = result.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async openRelatorio() {
      const route = this.$router.resolve({
        name: "prestacao-contas-mes",
        query: {
          data: JSON.stringify({
            receitas: this.receitas,
            despesas: this.despesas,
            mes: this.filter.mes,
            ano: this.filter.ano,
            totalR: this.sumReceitas,
            totalD: this.sumDespesas,
          }),
        },
      });
      console.log(route);
      window.open(route.href, "_blank");
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
  },
};
</script>
<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
