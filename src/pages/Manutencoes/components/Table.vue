<template>
  <div>
    <q-table
      title="Manutenções"
      :rows="data"
      :columns="columns"
      row-key="id"
      :filter="filter"
      :loading="loading"
      class="my-sticky-column-table"
      rows-per-page-label="Linhas por página"
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
      <template v-slot:body-cell-data="props">
        <td>
          {{ dateFormat(props.row.data) }}
        </td>
      </template>
      <template v-slot:body-cell-feito="props">
        <td>
          <q-chip outline :color="props.row.feito ? 'positive' : 'negative'">
            {{ props.row.feito ? "RESOLVIDO" : "EM ABERTO" }}
          </q-chip>
        </td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            color="positive"
            icon="receipt"
            flat
            round
            @click="ordem(props.row)"
            v-if="props.row.feito"
          />
          <q-btn
            color="primary"
            icon="edit"
            flat
            round
            @click="edit(props.row)"
            v-if="access.editar"
          />
          <q-btn
            color="negative"
            icon="delete"
            flat
            round
            @click="remove(props.row)"
            v-if="access.deletar"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>
<script>
import formaters from "../../../helpers/formaters";
export default {
  name: "TableManutencoes",
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
          name: "condomino",
          label: "Solicitante",
          field: "condomino",
          align: "left",
          sortable: true,
        },
        {
          name: "endereco",
          label: "Unidade",
          field: "endereco",
          align: "left",
          sortable: true,
        },
        {
          name: "titulo",
          label: "Título",
          field: "titulo",
          align: "left",
          sortable: true,
        },
        {
          name: "feito",
          label: "Status",
          field: "feito",
          align: "left",
          sortable: true,
        },
        {
          name: "data",
          label: "Data",
          field: "data",
          align: "left",
        },
        { name: "actions", label: "Ações", field: "actions", align: "center" },
      ],
    };
  },
  methods: {
    add() {
      this.$emit("add");
    },
    edit(manutencao) {
      this.$emit("edit", manutencao);
    },
    remove(manutencao) {
      this.$emit("delete", { modal: "delete", manutencao });
    },
    ordem(manutencao) {
      this.$emit("ordem", manutencao);
    },
    dateFormat(date) {
      return formaters.date(date);
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
