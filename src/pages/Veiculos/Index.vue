<template>
  <q-page class="q-ma-md">
    <h6>Controle de veiculos</h6>
    <TableSkeleton v-if="loading" />
    <TableVeiculos
      :data="veiculos"
      v-else
      @add="addVeiculo"
      @edit="editVeiculo"
      @delete="openModal"
    />
    <DeleteVeiculoModal
      :data="showModal.delete"
      @closeModal="closeModal"
      :veiculo="veiculo"
      @confirm="deleteVeiculo"
    />
  </q-page>
</template>

<script>
import baseApi from "src/api/base/base.api";
import veiculosApi from "src/api/veiculos/veiculos.api";
import TableVeiculos from "../Veiculos/components/Table.vue";
import DeleteVeiculoModal from "./components/DeleteVeiculoModal.vue";
import ShowToastMixin from "../../mixins/notify";
import TableSkeleton from "src/components/TableSkeleton.vue";
export default {
  name: "IndexPage",
  components: {
    TableVeiculos,
    DeleteVeiculoModal,
    TableSkeleton
  },
  data() {
    return {
      veiculos: [{ ativo: 1, cpf: null, endereco: "Bloco B1 Ap 203" }],
      loading: false,
      tableName: "veiculos",
      showModal: {
        delete: false,
      },
      veiculo: {},
    };
  },
  created() {
    this.getAll();
  },
  mixins: [ShowToastMixin],
  methods: {
    async getAll() {
      this.loading = true;
      await veiculosApi
        .get(this.tableName, "descricao")
        .then((result) => {
          this.veiculos = result.data;

          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
    addVeiculo() {
      this.$router.push({ name: "veiculo" });
    },
    editVeiculo(veiculo) {
      this.$router.push({
        name: "veiculo",
        params: { id: veiculo.id },
      });
    },
    async deleteVeiculo(veiculo) {
      await baseApi
        .remove("veiculos", veiculo)
        .then(() => {
          ShowToastMixin.showToast(`${veiculo.descricao} deletado com sucesso!`, "positive");
        })
        .catch((error) => {
          ShowToastMixin.showToast(error.message, "negative");
        });

      this.closeModal("delete");
      this.getAll();
    },
    openModal({ modal, veiculo }) {
      this.veiculo = veiculo;
      this.showModal[modal] = true;
    },
    closeModal(modal) {
      this.showModal[modal] = false;
    },
  },
};
</script>
