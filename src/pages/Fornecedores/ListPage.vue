<template>
  <q-page>
    <TableBasic
      :title="'Controle de clientes'"
      :data="data"
      :columns="columns"
      :editPath="'editFornecedor'"
    />
  </q-page>
</template>
<script>
import baseApi from "src/api/base/base.api";
import TableBasic from "src/components/TableBasic.vue";
import fornecedoresModel from "../../models/fornecedores";
export default {
  name: "ProductsPage",
  components: {
    TableBasic,
  },
  data() {
    return {
      data: [],
      columns: fornecedoresModel,
      tableName:'fornecedores'
    };
  },
  created() {
    this.getAllProducts();
  },
  methods: {
    async getAllProducts() {
      await baseApi
        .get(this.tableName)
        .then((response) => {
          this.data = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
