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
export default {
  name: "ProductsPage",
  components: {
    TableBasic,
  },
  data() {
    return {
      data: [],
      columns: [
        { name: "ID", align: "left", label: "ID", field: "ID", sortable: true },
        {
          name: "NOME",
          align: "left",
          label: "Nome",
          field: "NOME",
          sortable: true,
        },
        {
          name: "VALOR",
          align: "left",
          label: "Valor R$",
          field: "VALOR",
          sortable: true,
        },
        {
          name: "CATEGORIA",
          align: "left",
          label: "Categoria",
          field: "CATEGORIA",
          sortable: true,
        },
        {
          name: "SUBCATEGORIA",
          align: "left",
          label: "Sub-Categoria",
          field: "SUBCATEGORIA",
          sortable: true,
        },
        {
          name: "ATIVO",
          align: "left",
          label: "Status",
          field: "ATIVO",
          sortable: true,
        },
        {
          name: "ACTIONS",
          align: "left",
          label: "Ações",
          field: "ACTIONS",
          sortable: false,
        },
      ],
    };
  },
  created() {
    this.getAllProducts();
  },
  methods: {
    async getAllProducts() {
      await baseApi
        .get("produtos")
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
