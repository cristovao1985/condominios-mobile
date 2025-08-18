<template>
  <div>
    <q-table
      title="Veiculos"
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
        <q-btn
          color="primary"
          label="Adicionar"
          :disable="loading"
          icon="add"
          @click="add"
          v-if="access.criar"
          class="q-mt-sm"
        />
      </template>
      <template v-slot:item="props">
        <q-card class="q-pa-sm q-mb-sm" style="width: 100%">
          <strong>Descrição: </strong>{{ props.row.descricao }} <br />
          <strong>Placa: </strong>{{ props.row.placa }} <br />
        </q-card>
      </template>
    </q-table>
  </div>
</template>
<script>
export default {
  name: "TableVeiculos",
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
          name: "placa",
          label: "Placa",
          field: "placa",
          align: "left",
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
    edit(veiculo) {
      this.$emit("edit", veiculo);
    },
    remove(veiculo) {
      this.$emit("delete", { modal: "delete", veiculo });
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
