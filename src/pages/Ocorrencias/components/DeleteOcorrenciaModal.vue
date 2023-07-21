<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="show" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Atenção</div>
        </q-card-section>
        <q-card-section>
          <div class="text-h6 text-negative">
            Deseja deletar {{ ocorrencia.descricao }}?
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" @click="closeModal" />
          <q-btn flat label="Deletar" color="negative" @click="confirm" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: "DeleteOcorrenciaModal",
  props: {
    data: {
      type: Boolean,
    },
    ocorrencia: {
      type: Object,
    },
  },
  data() {
    return {
      show: this.data,
    };
  },
  watch: {
    data() {
      this.show = this.data;
    },
  },
  methods: {
    closeModal() {
      this.$emit("closeModal", "delete");
    },
    confirm() {
      this.$emit("confirm", this.ocorrencia);
    },
  },
};
</script>
