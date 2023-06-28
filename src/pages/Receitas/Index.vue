<template>
  <q-page class="q-ma-md">
    <h6>Controle de receitas</h6>
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
    <TableSkeleton v-if="loading" />
    <TableReceitas
      :data="receitas"
      v-else
      @add="addReceita"
      @edit="editReceita"
      @delete="openModal"
      @recibo="openRecibo"
      @recorrencia="addRecorrencia"
    />
    <DeleteReceitaModal
      :data="showModal.delete"
      @closeModal="closeModal"
      :receita="receita"
      @confirm="deleteReceita"
    />
  </q-page>
</template>

<script>
import baseApi from "src/api/base/base.api";
import receitasApi from "src/api/receitas/receitas.api";
import TableReceitas from "../Receitas/components/Table.vue";
import DeleteReceitaModal from "./components/DeleteReceitaModal.vue";
import ShowToastMixin from "../../mixins/notify";
import TableSkeleton from "src/components/TableSkeleton.vue";
export default {
  name: "IndexPage",
  components: {
    TableReceitas,
    DeleteReceitaModal,
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
      ],
      anos: [2021, 2022, 2023, 2024, 2025, 2026],
      filter: {
        ano: new Date().getFullYear(),
        mes: new Date()
          .toLocaleString("pt-br", { month: "long" })
          .toUpperCase(),
      },
    };
  },
  created() {
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
        .get(this.tableName, "data_pagamento", this.filter.ano, this.filter.mes)
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
      this.$router.push({
        name: "receita",
        params: { id: receita.id },
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
  },
};
</script>
