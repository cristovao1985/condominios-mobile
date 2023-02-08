<template>
  <q-page>
    <TableBasic
      :title="'Controle de produtos'"
      :data="data"
      :columns="columns"
      :editPath="'editProduct'"
    />
  </q-page>
</template>
<script>
import baseApi from "src/api/base/base.api";
import TableBasic from "src/components/TableBasic.vue";
import productsModel from "../../models/produtos"
export default {
  name: "ProductsPage",
  components: {
    TableBasic,
  },
  data() {
    return {
      data: [],
      columns: [...productsModel],
      tableName:'produtos'
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
    }
  },
};
</script>
