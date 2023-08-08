<template>
  <div class="q-pa-md">
    <q-table
      title="Condominos"
      :rows="data"
      :columns="columns"
      row-key="id"
      selection="multiple"
      v-model:selected="selected"
      :pagination="pagination"
    >
    </q-table>
  </div>
</template>
<script>
export default {
  name: "TableCondominos",
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      filter: "",
      loading: false,
      columns: [
        {
          name: "nome",
          label: "Nome",
          field: "nome",
          align: "left",
          sortable: true,
        },
        {
          name: "endereco",
          label: "Unidade",
          field: "endereco",
          align: "left",
        },
        {
          name: "telefone",
          label: "Telefone",
          field: "telefone",
          align: "left",
        },
      ],
      selected: [],
      pagination: {
        rowsPerPage: 0,
      },
    };
  },
  watch: {
    selected() {
      this.$emit("setSelecteds", { selected: this.selected });
    },
  },
  methods: {
    add() {
      this.$emit("add");
    },
    recorrencia() {
      this.$emit("recorrencia");
    },
  },
};
</script>
