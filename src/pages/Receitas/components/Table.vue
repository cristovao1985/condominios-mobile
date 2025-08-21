<template>
  <div>
    <q-table
      title="Receitas"
      :rows="data"
      :columns="columns"
      row-key="id"
      :filter="filter"
      :loading="loading"
      class="my-sticky-column-table"
      :pagination="pagination"
      rows-per-page-label="Linhas por página"
      dense
      grid
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
      </template>
      <template v-slot:item="props">
        <q-card class="q-pa-sm q-mb-sm" style="width: 100%">
          <strong>Descrição: </strong>{{ props.row.descricao }} <br />
          <strong>Valor R$: </strong>{{ props.row.valor }} <br />
          <strong>Data pagamento: </strong> {{ props.row.data_pagamento }}
          <br />
          <strong>Pago: </strong> {{ props.row.pago ? "Sim" : "Não" }} <br />
          <q-card-actions align="right">
            <q-btn
              flat
              label="Ver recibo"
              @click="openModal('pagamento', props.row)"
              v-if="props.row.recibo"
            />
            <q-btn
              flat
              label="Enviar recibo"
              color="positive"
              @click="openModal('recibo', props.row)"
               v-if="!props.row.pago"
            />
          </q-card-actions>
        </q-card>
      </template>
    </q-table>

    <q-dialog v-model="showModal.recibo" persistent>
      <q-card>
        <q-card-section>
          <span class="text-h6"
            >Selecione o recibo para o
            <span class="text-primary">{{ receita.descricao }}</span></span
          >
        </q-card-section>
        <q-card-section>
          <q-file
            outlined
            v-model="file"
            label="Selecione o recibo de pagamento"
            class="q-mb-sm"
          >
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file>

          <iframe
            :src="receita.recibo"
            frameborder="0"
            width="100%"
            v-if="receita.recibo"
          />
          <q-card-actions align="right">
            <q-btn
              icon="delete"
              dense
              flat
              color="negative"
              v-if="receita.recibo"
              @click="receita.recibo = ''"
            />
          </q-card-actions>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" @click="closeModal('recibo')" />

          <q-btn
            flat
            label="Enviar recibo"
            color="positive"
            v-if="receita.recibo"
            @click="edit(receita)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="showModal.pagamento">
      <q-card>
        <q-card-section>
          <span class="text-h6"
            >Recibo para o
            <span class="text-primary">{{ receita.descricao }}</span></span
          >
        </q-card-section>
        <q-card-section>
          <iframe
            :src="receita.recibo"
            frameborder="0"
            width="100%"
            v-if="receita.recibo"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Fechar" @click="closeModal('pagamento')" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import formaters from "../../../helpers/formaters";
import base64Helper from "../../../helpers/base64";
export default {
  name: "TableCondominos",
  props: {
    data: {
      type: Array,
      required: true,
    },
    access: {
      type: Object,
    },
  },
  data() {
    return {
      filter: "",
      loading: false,
      columns: [
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
          name: "valor",
          label: "Valor R$",
          field: "valor",
          align: "left",
          sortable: true,
        },

        {
          name: "pago",
          label: "Situação",
          field: "pago",
          align: "left",
          sortable: true,
        },
        {
          name: "data_pagamento",
          label: "Data pagamento",
          field: "data_pagamento",
          align: "left",
          sortable: true,
        },
      ],
      pagination: {
        rowsPerPage: 10,
      },
      file: "",
      showModal: {
        recibo: false,
        pagamento: false,
      },
      receita: {},
    };
  },
  watch: {
    file() {
      this.convertImageToBase64();
    },
  },
  methods: {
    add() {
      this.$emit("add");
    },
    edit(receita) {
      this.$emit("edit", receita);
      this.receita = {};
      this.closeModal("recibo");
      this.file = "";
    },
    remove(receita) {
      this.$emit("delete", { modal: "delete", receita });
    },
    recibo(receita) {
      this.$emit("recibo", receita);
    },
    dateFormat(date) {
      return formaters.date(date);
    },
    recorrencia() {
      this.$emit("recorrencia");
    },
    openModal(modal, object) {
      this.receita = { ...object };
      this.showModal[modal] = true;
    },
    closeModal(modal) {
      this.showModal[modal] = false;
    },
    async convertImageToBase64(file = this.file) {
      return await base64Helper
        .getBase64(file)
        .then((data) => {
          this.receita.recibo = data;
          console.log(data);
        })
        .catch((error) => {
          console.log(error);

          return null;
        });
    },
  },
};
</script>
<style lang="sass">
.my-sticky-column-table
  /* specifying max-width so the example can
    highlight the sticky column on any browser window */


  thead tr:first-child th:first-child
    /* bg color is important for th; just specify one */
    background-color: #ddd

  td:first-child
    background-color: #ddd

  th:first-child,
  td:first-child
    position: sticky
    left: 0
    z-index: 1
</style>
