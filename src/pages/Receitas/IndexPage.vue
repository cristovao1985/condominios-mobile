<template>
  <q-page class="q-ma-md">
    <!-- <div class="row">
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
    </div> -->
    <TableSkeleton v-if="loading" />
    <TableReceitas :data="receitas" v-else @recibo="openRecibo" @edit="editReceita"/>
  </q-page>
</template>

<script>
import baseApi from "src/api/base/base.api";
import receitasApi from "src/api/receitas/receitas.api";
import TableReceitas from "./components/Table.vue";
import ShowToastMixin from "../../mixins/notify";
import TableSkeleton from "src/components/TableSkeleton.vue";
import acessosApi from "../../api/acessos/acessos";
export default {
  name: "IndexPage",
  components: {
    TableReceitas,
    TableSkeleton,
  },
  data() {
    return {
      receitas: [],
      receitasTemp: [],
      loading: false,
      tableName: "receitas",
      showModal: {
        delete: false,
      },
      receita: {},
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
        "TODOS",
      ],
      anos: [2021, 2022, 2023, 2024, 2025, 2026],
      filter: {
        ano: new Date().getFullYear(),
        mes:
          localStorage.getItem("mes-receita") ||
          new Date().toLocaleString("pt-br", { month: "long" }).toUpperCase(),
      },
      acessos: { criar: 0, editar: 0, ler: 1, deletar: 0 },
    };
  },
  created() {
    //this.getAcessos();
    this.getAll();
  },
  mixins: [ShowToastMixin],
  watch: {
    "filter.mes"() {
      this.getAll();
    },
    "filter.ano"() {
      this.getAll();
    },
  },
  methods: {
    async getAll() {
      this.loading = true;
      await receitasApi
        .getLancamentosMorador(this.tableName)
        .then((result) => {
          this.receitas = result.data;

          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
    addReceita() {
      this.$router.push({ name: "receita" });
    },
    addRecorrencia() {
      this.$router.push({ name: "recorrencia" });
    },
    editReceita(receita) {
      delete receita.data_pagamento
      baseApi
        .update("receitas", receita)
        .then(() => {
          ShowToastMixin.showToast(
            "Recibo enviado com sucesso! Aguarde para que o setor responsável dê baixa no lançamento",
            "positive"
          );
        })
        .catch((error) => {
          ShowToastMixin.showToast(
            "Houve um erro ao enviar recibo. Tente novamente",
            "negative"
          );
        });
    },
    async deleteReceita(receita) {
      await baseApi
        .remove("receitas", receita)
        .then(() => {
          ShowToastMixin.showToast(
            `${receita.descricao} deletada com sucesso!`,
            "positive"
          );
        })
        .catch((error) => {
          ShowToastMixin.showToast(error.message, "negative");
        });

      this.closeModal("delete");
      this.getAll();
    },
    openModal({ modal, receita }) {
      this.receita = receita;
      this.showModal[modal] = true;
    },
    closeModal(modal) {
      this.showModal[modal] = false;
    },
    async openRecibo(receita) {
      const route = this.$router.resolve({
        name: "recibo-receita",
        query: { data: JSON.stringify(receita) },
        params: { data: JSON.stringify(receita) },
      });
      console.log(route);
      window.open(route.href, "_blank");
    },
    async getAcessos() {
      await acessosApi
        .get(this.tableName)
        .then((result) => {
          this.acessos = result.data[0];
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
