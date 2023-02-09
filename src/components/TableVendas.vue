<template>
  <q-table
    :title="title"
    :data="data"
    :columns="columns"
    row-key="id"
    :filter="search"
    class="my-sticky-column-table"
  >
    <template v-slot:top-left>
      <q-input
        v-model="search"
        label="Pesquisar"
        clearable
        placeholder="Digite o nome"
      />
    </template>
    <template v-slot:body-cell-ATIVO="item">
      <td>
        <q-chip :color="item.row.ATIVO ? 'green' : 'red'" text-color="white">
          {{ item.row.ATIVO ? "ATIVO" : "INATIVO" }}
        </q-chip>
      </td>
    </template>
    <template v-slot:body-cell-QUANTIDADE="item" v-if="canEditQtde">
      <td>
        <q-input type="number" v-model="item.row.QUANTIDADE" @input="changeValue(item.row)"/>
      </td>
    </template>
    <template v-slot:body-cell-PAGO="item">
      <td>
        <q-chip :color="item.row.PAGO ? 'green' : 'red'" text-color="white">
          {{ item.row.PAGO ? "PAGO" : "EM ABERTO" }}
        </q-chip>
      </td>
    </template>

    <template v-slot:body-cell-ACTIONS="item">
      <td>
        <q-btn
          size="10px"
          round
          color="primary"
          icon="add"
          @click="add(item.row)"
          v-if="showAddButton"
        />
        <q-btn
          size="10px"
          round
          color="red"
          icon="delete"
          @click="remove(item.row)"
          v-if="showDeleteButton"
        />
      </td>
    </template>
  </q-table>
</template>

<script>
import { exportFile } from "quasar";
import csvHelper from "../helpers/csv";
export default {
  name: "TableBasic",
  props: {
    title: {
      type: String,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    showDeleteButton: {
      type: Boolean,
    },
    showAddButton: {
      type: Boolean,
    },
    canEditQtde: {
      type: Boolean,
    },
  },
  data() {
    return {
      search: ""
    };
  },
  methods: {
    exportTable() {
      // naive encoding to csv format
      const content = [
        this.columns.map((col) => csvHelper.wrapCsvValue(col.label)),
      ]
        .concat(
          this.data.map((row) =>
            this.columns
              .map((col) =>
                csvHelper.wrapCsvValue(
                  typeof col.field === "function"
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                  col.format
                )
              )
              .join(",")
          )
        )
        .join("\r\n");

      const status = exportFile("table-export.csv", content, "text/csv");

      if (status !== true) {
        this.$q.notify({
          message: "Browser denied file download...",
          color: "negative",
          icon: "warning",
        });
      }
    },
    add(item) {
      this.$emit("add", item);
    },
    remove(item) {
      this.$emit("remove", item);
    },
    searchItem() {
      this.$emit("openModal");
    },
    changeValue(item){
      console.log('changeValue',item)
    }
  },
};
</script>
<style lang="sass">
.my-sticky-column-table
  /* specifying max-width so the example can
    highlight the sticky column on any browser window */


  thead tr:first-child th:first-child
    /* bg color is important for th; just specify one */
    background-color: #fff

  td:first-child
    background-color: #cecece

  th:first-child,
  td:first-child
    position: sticky
    left: 0
    z-index: 1
</style>
