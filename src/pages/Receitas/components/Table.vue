<template>
  <div class="q-pa-md">
    <q-table
      title="Receitas"
      :rows="data"
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
            color="positive"
            icon="receipt"
            flat
            round
            @click="recibo(props.row)"
          />
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
          name: "condomino",
          label: "Condômino",
          field: "condomino",
          align: "left",
        },
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
          name: "mes",
          label: "Mês referência",
          field: "mes",
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
          name: "endereco",
          label: "Unidade",
          field: "endereco",
          align: "left",
        },
        {
          name: "data_pagamento",
          label: "Data pagamento",
          field: "data_pagamento",
          align: "left",
          sortable: true,
        },
        { name: "actions", label: "Ações", field: "actions", align: "center" },
      ],
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
  },
};
</script>
