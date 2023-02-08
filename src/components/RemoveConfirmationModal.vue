<template>
  <q-dialog v-model="confirm" persistent>
    <q-card style="width: 600px">
      <q-card-section>
        <div class="text-h6">Deletar registro</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <p class="text-red text-bold">
          {{ `Deseja realmente deletar ${object.NOME}?` }}
        </p>
        <p>Esta ação não poderá ser desfeita</p>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancelar" @click="closeModal" />
        <q-btn flat label="Sim, remover" color="red" @click="confirmRemove" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import baseApi from "../api/base/base.api";
export default {
  name: "RemoveConfirmationModal",
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    object: {
      type: Object,
      required: true,
    },
    table: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      confirm: this.show || false,
    };
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
    async confirmRemove() {
      await baseApi
        .remove(this.table, this.object)
        .then((response) => {
          alert("Registro removido com sucesso");
        })
        .catch((error) => {})
        .finally(() => {
          this.confirm = false;
          this.$router.push({ name: this.table });
        });
    },
  },
};
</script>
