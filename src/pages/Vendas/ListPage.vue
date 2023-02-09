<template>
  <q-page>
    <TableBasic
      :title="'Controle de clientes'"
      :data="data"
      :columns="columns"
      :editPath="'editVendas'"
    />
  </q-page>
</template>
<script>
import vendasApi from "src/api/vendas/vendas.api";
import TableBasic from "src/components/TableBasic.vue";
import vendasModel from "../../models/vendas";
export default {
  name: "ProductsPage",
  components: {
    TableBasic,
  },
  data() {
    return {
      data: [],
      columns: vendasModel,
      tableName:'vendas'
    };
  },
  created() {
    this.getAllProducts();
  },
  methods: {
    async getAllProducts() {
      await vendasApi
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
