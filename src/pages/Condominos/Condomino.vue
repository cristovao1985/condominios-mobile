<template>
  <q-page class="q-ma-md">
    <h6>{{ edit ? `Editar registro #${data.id}` : "Inserir registro" }}</h6>
    <q-form @submit="saveProduct" ref="form" class="q-gutter-md">
      <q-input v-model="object.nome" label="Nome" required />
      <q-input v-model="object.cpf" label="CPF" mask="###.###.###-##" />
      <q-input
        v-model="object.telefone"
        label="Telefone"
        mask="(##)####-####"
        required
      />
      <q-input v-model="object.email" label="E-mail" type="email" />
      <q-input v-model="object.endereco" label="Unidade" required />
      <q-checkbox
        v-model="object.ativo"
        label="Ativo?"
        :true-value="1"
        :false-value="0"
      />

      <div class="q-mt-md">
        <q-btn
          :label="btnSaveText"
          type="submit"
          class="full-width"
          color="primary"
        />
      </div>
    </q-form>
    <!-- <div class="q-mt-md">
      <q-btn
        label="Remover registro"
        outline
        class="full-width"
        color="red"
        v-if="edit"
      />
    </div> -->
  </q-page>
</template>
<script>
import baseApi from "src/api/base/base.api";

import ShowToastMixin from "../../mixins/notify";
export default {
  name: "Condomino",
  props: {
    edit: {
      type: Boolean,
      required: true,
      default: () => {
        return false;
      },
    },
    data: {
      type: Object,
    },
  },
  data() {
    return {
      object: {
        ...(this.data || {
          nome: "",
          telefone: "",
          cpf: "",
          email: "",
          ativo: 1,
        }),
      },
      tableName: "condominos",
    };
  },
  computed: {
    btnSaveText() {
      return this.edit ? "Atualizar registro" : "Inserir registro";
    },
  },
  mixins: [ShowToastMixin],
  methods: {
    async saveProduct() {
      this.$refs.form.validate().then(() => {
        if (this.edit) {
          this.update();
          return;
        }
        this.insert();
      });
    },
    async insert() {
      await baseApi
        .insert(this.tableName, this.object)
        .then(() => {
          ShowToastMixin.showToast("Registro inserido com sucesso", "positive");
        })
        .catch((error) => {
          ShowToastMixin.showToast(error.message, "negative");
        })
        .finally(() => {
          this.object = {};
          this.backToList();
        });
    },
    async update() {
      await baseApi
        .update(this.tableName, this.object)
        .then(() => {
          ShowToastMixin.showToast("Registro alterado com sucesso", "positive");
        })
        .catch((error) => {
          ShowToastMixin.showToast(error.message, "negative");
        })
        .finally(() => {
          this.object = {};
          this.backToList();
        });
    },
    backToList() {
      this.$router.push({ name: this.tableName });
    },
  },
};
</script>
