<template>
  <q-table
    :title="title"
    :data="data"
    :columns="columns"
    row-key="id"
    :filter="search"
  >
    <template v-slot:top-left>
      <q-input
        v-model="search"
        label="Pesquisar produto"
        clearable
        placeholder="Digite o nome"
      />
    </template>
    <template v-slot:top-right>
      <q-btn
        round
        color="primary"
        icon="add"
        class="q-ma-md"
        @click="edit(false)"
      />
      <q-btn color="green" round icon="file_download" @click="exportTable" />
    </template>
    <template v-slot:body-cell-NOME="item">
      <td>
        <q-btn flat color="primary" :label="item.row.NOME">
          <q-tooltip v-if="item.row.DESCRICAO">
            {{ item.row.DESCRICAO }}
          </q-tooltip>
        </q-btn>
      </td>
    </template>
    <template v-slot:body-cell-ACTIONS="item">
      <td>
        <q-btn
          size="10px"
          round
          color="primary"
          icon="edit"
          @click="edit(true, item.row)"
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
    editPath: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      search: "",
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
    edit(edit, object) {
      this.$router.push({
        name: this.editPath,
        params: { data: object, edit: edit },
      });
    },
  },
};
</script>
