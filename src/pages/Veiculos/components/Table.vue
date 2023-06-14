<template>
  <div class="q-pa-md">
    <q-table
      title="Veiculos"
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
  name: "TableVeiculos",
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
        {
          name: "condomino",
          label: "Proprietário",
          field: "condomino",
          align: "left",
        },
        {
          name: "endereco",
          label: "Unidade",
          field: "endereco",
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
    edit(veiculo) {
      this.$emit("edit", veiculo);
    },
    remove(veiculo) {
      this.$emit("delete", { modal: "delete", veiculo });
    },
  },
};
</script>
