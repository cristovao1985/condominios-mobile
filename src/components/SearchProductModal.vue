<template>
  <q-dialog v-model="confirm" persistent>
    <q-card style="width: 1000px">
      <q-card-section>
        <div class="text-h6">Pesquisar produto</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <TableVendas
          :title="'Produtos'"
          :data="data"
          :columns="columns"
          @add="add"
          @remove="remove"
          :showDeleteButton="showDeleteButton"
          :showAddButton="showAddButton"
          :canEditQtde="canEditQtde"
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancelar" @click="closeModal" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import TableVendas from "./TableVendas.vue";
export default {
  name: "RemoveConfirmationModal",
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    data: {
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
  components: {
    TableVendas,
  },
  data() {
    return {
      confirm: this.show || false,
    };
  },
  mounted() {
    this.$root.$on("openModal", () => {
      // your code goes here
      alert("chamou");
    });
  },
  watch: {
    show() {
      this.confirm = this.show;
    },
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    add(item) {
      debugger;
      this.$emit("add", item);
    },
    remove() {
      this.$emit("remove");
    },
    openModal() {
      alert("chamou segundo");
    },
  },
};
</script>
