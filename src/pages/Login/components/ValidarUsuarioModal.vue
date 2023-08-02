<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="show" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Solicitar alteração de senha</div>
        </q-card-section>
        <q-card-section>
          <q-form>
            <q-input
              filled
              type="text"
              v-model="login.user"
              label="Digite seu usuário"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
            />
            <q-input
              filled
              v-model="login.email"
              label="Digite seu email atual"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
              type="email"
            />
          </q-form>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" @click="closeModal" />
          <q-btn flat label="Solicitar" color="primary" @click="validate" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "DeleteDespesaModal",
  props: {
    data: {
      type: Boolean,
    },
  },
  data() {
    return {
      show: this.data,
      login: {
        user: "",
        email: "",
      },
    };
  },
  watch: {
    data() {
      this.show = this.data;
    },
  },
  methods: {
    closeModal() {
      this.$emit("closeModal", "validate");
    },
    validate() {
      this.$emit("validate", {
        user: this.login.user,
        email: this.login.email,
      });
    },
  },
};
</script>
