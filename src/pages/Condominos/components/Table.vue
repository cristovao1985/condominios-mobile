<template>
  <div class="q-pa-md">
    <q-table
      title="Condominos"
      :data="data"
      :columns="columns"
      row-key="id"
      :filter="filter"
      :loading="loading"
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
        />
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            color="primary"
            icon="edit"
            flat
            round
            @click="edit(props.row)"
          />
          <q-btn
            color="negative"
            icon="delete"
            flat
            round
            @click="remove(props.row)"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>
<script>
import ref from "vue";
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
        { name: "id", label: "#", field: "id", align: "left", sortable: true },
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
        { name: "email", label: "E-mail", field: "email", align: "left" },
        // { name: "ativo", label: "Ativo?", field: "ativo", align: "left" },
        { name: "actions", label: "Ações", field: "actions", align: "center" },
      ],
    };
  },
  methods: {
    add() {
      this.$emit("add");
    },
    edit(condomino) {
      this.$emit("edit", condomino);
    },
    remove(condomino) {
      this.$emit("delete", { modal: "delete", condomino });
    },
  },
};
</script>
