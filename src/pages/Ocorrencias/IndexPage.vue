<template>
  <q-page class="q-ma-md">
    <TableSkeleton v-if="loading" />
    <TableOcorrencias
      :data="ocorrencias"
      v-else
      @add="addOcorrencia"
      @edit="editOcorrencia"
      @delete="openModal"
      :access="acessos"
    />
    <DeleteOcorrenciaModal
      :data="showModal.delete"
      @closeModal="closeModal"
      :ocorrencia="ocorrencia"
      @confirm="deleteOcorrencia"
    />
  </q-page>
</template>

<script>
import baseApi from "src/api/base/base.api";
import TableOcorrencias from "./components/Table.vue";
import DeleteOcorrenciaModal from "./components/DeleteOcorrenciaModal.vue";
import ShowToastMixin from "../../mixins/notify";
import TableSkeleton from "src/components/TableSkeleton.vue";
import acessosApi from "../../api/acessos/acessos";
export default {
  name: "IndexPage",
  components: {
    TableOcorrencias,
    DeleteOcorrenciaModal,
    TableSkeleton,
  },
  data() {
    return {
      ocorrencias: [],
      loading: false,
      tableName: "ocorrencias",
      showModal: {
        delete: false,
      },
      ocorrencia: {},
      acessos: { criar: 0, editar: 0, ler: 1, deletar: 0 },
    };
  },
  async created() {
    //this.getAcessos();
    this.getAll();
  },
  mixins: [ShowToastMixin],
  methods: {
    async getAll() {
      this.loading = true;
      await baseApi
        .get(this.tableName, "data")
        .then((result) => {
          this.ocorrencias = result.data;
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
    addOcorrencia() {
      this.$router.push({ name: "ocorrencia" });
    },
    editOcorrencia(ocorrencia) {
      this.$router.push({
        name: "ocorrencia",
        params: { id: ocorrencia.id },
      });
    },
    async deleteOcorrencia(ocorrencia) {
      await baseApi
        .remove("ocorrencias", ocorrencia)
        .then(() => {
          ShowToastMixin.showToast(
            `${ocorrencia.titulo} deletado com sucesso!`,
            "positive"
          );
        })
        .catch((error) => {
          ShowToastMixin.showToast(error.message, "negative");
        });

      this.closeModal("delete");
      this.getAll();
    },
    openModal({ modal, ocorrencia }) {
      this.ocorrencia = ocorrencia;
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
