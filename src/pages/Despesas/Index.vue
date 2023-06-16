<template>
  <q-page class="q-ma-md">
    <h6>Controle de despesas</h6>
    <TableSkeleton v-if="loading" />
    <TableDespesas
      :data="despesas"
      v-else
      @add="addDespesa"
      @edit="editDespesa"
      @delete="openModal"
      @recibo="openRecibo"
    />
    <DeleteDespesaModal
      :data="showModal.delete"
      @closeModal="closeModal"
      :despesa="despesa"
      @confirm="deleteDespesa"
    />
  </q-page>
</template>

<script>
import baseApi from "src/api/base/base.api";
import TableDespesas from "../Despesas/components/Table.vue";
import DeleteDespesaModal from "./components/DeleteDespesaModal.vue";
import ShowToastMixin from "../../mixins/notify";
import TableSkeleton from "src/components/TableSkeleton.vue";
export default {
  name: "IndexPage",
  components: {
    TableDespesas,
    DeleteDespesaModal,
    TableSkeleton,
  },
  data() {
    return {
      despesas: [],
      receitasTemp: [],
      loading: false,
      tableName: "despesas",
      showModal: {
        delete: false,
      },
      despesa: {},
    };
  },
  created() {
    this.getAll();
  },
  mixins: [ShowToastMixin],
  methods: {
    async getAll() {
      this.loading = true;
      await baseApi
        .get(this.tableName, "id")
        .then((result) => {
          this.despesas = result.data;

          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
    addDespesa() {
      this.$router.push({ name: "despesa" });
    },
    editDespesa(despesa) {
      this.$router.push({
        name: "despesa",
        params: { id: despesa.id },
      });
    },
    async deleteDespesa(despesa) {
      await baseApi
        .remove(this.tableName, despesa)
        .then(() => {
          ShowToastMixin.showToast(
            `${despesa.descricao} deletada com sucesso!`,
            "positive"
          );
        })
        .catch((error) => {
          ShowToastMixin.showToast(error.message, "negative");
        });

      this.closeModal("delete");
      this.getAll();
    },
    openModal({ modal, despesa }) {
      this.despesa = despesa;
      this.showModal[modal] = true;
    },
    closeModal(modal) {
      this.showModal[modal] = false;
    },
    async openRecibo(despesa) {
      const route = this.$router.resolve({
        name: "recibo-despesa",
        query: { data: JSON.stringify(despesa) },
        params: { data: JSON.stringify(despesa) },
      });

      window.open(route.href, "_blank");
    },
  },
};
</script>
