<template>
  <q-page class="q-ma-md">
    <TableSkeleton v-if="loading" />
    <TableCondominos
      :data="condominos"
      v-else
      @add="addCondomino"
      @edit="editCondomino"
      @delete="openModal"
      :access="acessos"
    />
    <DeleteCondominoModal
      :data="showModal.delete"
      @closeModal="closeModal"
      :condomino="condomino"
      @confirm="deleteCondomino"
    />
  </q-page>
</template>

<script>
import baseApi from "src/api/base/base.api";
import TableCondominos from "../Condominos/components/Table.vue";
import DeleteCondominoModal from "./components/DeleteCondominoModal.vue";
import ShowToastMixin from "../../mixins/notify";
import TableSkeleton from "src/components/TableSkeleton.vue";
import acessosApi from "../../api/acessos/acessos";
export default {
  name: "IndexPage",
  components: {
    TableCondominos,
    DeleteCondominoModal,
    TableSkeleton,
  },
  data() {
    return {
      condominos: [{ ativo: 1, cpf: null, endereco: "Bloco B1 Ap 203" }],
      condominosTemp: [],
      loading: false,
      tableName: "condominos",
      showModal: {
        delete: false,
      },
      condomino: {},
      acessos: { criar: 0, ler: 0, editar: 0, deletar: 0, pagina: "" },
    };
  },
  created() {
    this.getAcessos();
    this.getAll();
  },
  mixins: [ShowToastMixin],
  methods: {
    async getAll() {
      this.loading = true;
      await baseApi
        .get(this.tableName, "nome")
        .then((result) => {
          this.condominos = result.data;
          this.loading = false;
        })
        .catch((error) => {
          ShowToastMixin.showToast(
            error.data.message || "Houve um erro na sua requisição",
            "negative"
          );
          this.loading = false;
        });
    },
    addCondomino() {
      this.$router.push({ name: "condomino" });
    },
    editCondomino(condomino) {
      this.$router.push({
        name: "condomino",
        params: { edit: true, id: condomino.id },
      });
    },
    async deleteCondomino(condomino) {
      await baseApi
        .remove("condominos", condomino)
        .then(() => {
          ShowToastMixin.showToast(
            `${condomino.nome} deletado com sucesso!`,
            "positive"
          );
        })
        .catch((error) => {
          ShowToastMixin.showToast(error.message, "negative");
        });

      this.closeModal("delete");
      this.getAll();
    },
    openModal({ modal, condomino }) {
      this.condomino = condomino;
      this.showModal[modal] = true;
    },
    closeModal(modal) {
      this.showModal[modal] = false;
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
