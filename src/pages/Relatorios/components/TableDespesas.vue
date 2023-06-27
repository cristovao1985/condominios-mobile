<template>
  <div>
    <q-table
      :rows="data"
      :columns="columns"
      row-key="id"
      hide-pagination
      title="Despesas"
      flat
      dense
    >
      <template v-slot:body-cell-data_pagamento="props">
        <td class="text-left">
          {{ dateFormat(props.row.data_pagamento) }}
        </td>
      </template>
      <template v-slot:bottom>
        <strong>Total acumulado R$: {{ sum() }}</strong>
      </template>
    </q-table>
  </div>
</template>
<script>
import formaters from "../../../helpers/formaters";
export default {
  name: "TableDespesas",
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
          name: "data_pagamento",
          label: "Data",
          field: "data_pagamento",
          align: "left",
        },
        {
          name: "descricao",
          label: "Descrição",
          field: "descricao",
          align: "left",
        },
        {
          name: "valor",
          label: "Valor R$",
          field: "valor",
          align: "left",
        },
      ],
    };
  },
  methods: {
    dateFormat(date) {
      return formaters.date(date);
    },
    sum() {
      return this.data.reduce((accumulator, object) => {
        return accumulator + parseFloat(object.valor);
      }, 0);
    },
  },
};
</script>
