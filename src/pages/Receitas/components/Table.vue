<template>
  <div>
    <q-table
      title="Receitas"
      :rows="data"
      :columns="columns"
      row-key="id"
      :filter="filter"
      :loading="loading"
      class="my-sticky-column-table"
      :pagination="pagination"
      rows-per-page-label="Linhas por página"
      dense
      grid
    >
      <template v-slot:top>
        <q-input
          dense
          debounce="300"
          color="primary"
          v-model="filter"
          placeholder="Digite para filtrar"
          label="Filtrar"
          autofocus
          clearable
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-space />
      </template>
      <template v-slot:item="props">
        <q-card class="q-pa-sm q-mb-sm" style="width: 100%">
          <strong>Descrição: </strong>{{ props.row.descricao }} <br />
          <strong>Valor R$: </strong>{{ props.row.valor }} <br />
          <strong>Data pagamento: </strong> {{ props.row.data_pagamento }}
          <br />
          <strong>Pago: </strong> {{ props.row.pago ? "Sim" : "Não" }} <br />
        </q-card>
      </template>
    </q-table>
  </div>
</template>
<script>
import formaters from "../../../helpers/formaters";
export default {
  name: "TableCondominos",
  props: {
    data: {
      type: Array,
      required: true,
    },
    access: {
      type: Object,
    },
  },
  data() {
    return {
      filter: "",
      loading: false,
      columns: [
        {
          name: "descricao",
          label: "Descrição",
          field: "descricao",
          align: "left",
          sortable: true,
        },
        {
          name: "categoria",
          label: "Categoria",
          field: "categoria",
          align: "left",
          sortable: true,
        },

        {
          name: "valor",
          label: "Valor R$",
          field: "valor",
          align: "left",
          sortable: true,
        },

        {
          name: "pago",
          label: "Situação",
          field: "pago",
          align: "left",
          sortable: true,
        },
        {
          name: "data_pagamento",
          label: "Data pagamento",
          field: "data_pagamento",
          align: "left",
          sortable: true,
        },
      ],
      pagination: {
        rowsPerPage: 10,
      },
    };
  },
  methods: {
    add() {
      this.$emit("add");
    },
    edit(receita) {
      this.$emit("edit", receita);
    },
    remove(receita) {
      this.$emit("delete", { modal: "delete", receita });
    },
    recibo(receita) {
      this.$emit("recibo", receita);
    },
    dateFormat(date) {
      return formaters.date(date);
    },
    recorrencia() {
      this.$emit("recorrencia");
    },
  },
};
</script>
<style lang="sass">
.my-sticky-column-table
  /* specifying max-width so the example can
    highlight the sticky column on any browser window */


  thead tr:first-child th:first-child
    /* bg color is important for th; just specify one */
    background-color: #ddd

  td:first-child
    background-color: #ddd

  th:first-child,
  td:first-child
    position: sticky
    left: 0
    z-index: 1
</style>
