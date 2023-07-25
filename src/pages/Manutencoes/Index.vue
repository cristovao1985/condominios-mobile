<template>
  <q-page class="q-ma-md">
    <h6>Controle de manutenções</h6>
    <TableSkeleton v-if="loading" />
    <TableManutencoes
      :data="manutencoes"
      v-else
      @add="addManutencao"
      @edit="editManutencao"
      @delete="openModal"
      @ordem="openOrdem"
      :access="acessos"
    />
    <DeleteManutencaoModal
      :data="showModal.delete"
      @closeModal="closeModal"
      :manutencao="manutencao"
      @confirm="deleteManutencao"
    />
  </q-page>
</template>

<script>
import baseApi from "src/api/base/base.api";
import manutencoesApi from "src/api/manutencoes/manutencoes.api";
import TableManutencoes from "../Manutencoes/components/Table.vue";
import DeleteManutencaoModal from "./components/DeleteManutencaoModal.vue";
import ShowToastMixin from "../../mixins/notify";
import TableSkeleton from "src/components/TableSkeleton.vue";
import acessosApi from "../../api/acessos/acessos";
export default {
  name: "IndexPage",
  components: {
    TableManutencoes,
    DeleteManutencaoModal,
    TableSkeleton,
  },
  data() {
    return {
      manutencoes: [],
      manutencoesTemp: [],
      loading: false,
      tableName: "manutencoes",
      showModal: {
        delete: false,
      },
      manutencao: {},
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
      acessos: { criar: 0, editar: 0, ler: 1, deletar: 0 },
    };
  },
  created() {
    this.getAcessos();
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
      await manutencoesApi
        .get(this.tableName, "id", this.filter.ano, this.filter.mes)
        .then((result) => {
          this.manutencoes = result.data;

          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
    addManutencao() {
      this.$router.push({ name: "manutencao" });
    },
    editManutencao(manutencao) {
      this.$router.push({
        name: "manutencao",
        params: { id: manutencao.id },
      });
    },
    async deleteManutencao(manutencao) {
      await baseApi
        .remove(this.tableName, manutencao)
        .then(() => {
          ShowToastMixin.showToast(
            `${manutencao.descricao} deletada com sucesso!`,
            "positive"
          );
        })
        .catch((error) => {
          ShowToastMixin.showToast(error.message, "negative");
        });

      this.closeModal("delete");
      this.getAll();
    },
    openModal({ modal, manutencao }) {
      this.manutencao = manutencao;
      this.showModal[modal] = true;
    },
    closeModal(modal) {
      this.showModal[modal] = false;
    },
    async openOrdem(manutencao) {
      const route = this.$router.resolve({
        name: "ordem-manutencao",
        query: { data: JSON.stringify(manutencao) },
        params: { data: JSON.stringify(manutencao) },
      });

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
