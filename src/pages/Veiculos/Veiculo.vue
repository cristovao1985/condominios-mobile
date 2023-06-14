<template>
  <q-page class="q-ma-md">
    <h6>{{ edit ? `Editar registro #${data.id}` : "Inserir registro" }}</h6>
    <q-form @submit="saveVeiculo" ref="form" class="q-gutter-md">
      <q-select
        v-model="object.id_condomino"
        :options="condominos"
        label="Proprietário"
        option-value="id"
        option-label="nome"
        emit-value
        map-options
        :value="object.condomino"
        required
      />
      <q-input v-model="object.descricao" label="Descrição" required />
      <q-input v-model="object.placa" label="Placa" required/>

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
  name: "Veiculo",
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
          descricao: "",
          placa: "",
          id_condomino: "",
        }),
      },
      tableName: "veiculos",
      condominos: [],
    };
  },
  computed: {
    btnSaveText() {
      return this.edit ? "Atualizar registro" : "Inserir registro";
    },
  },
  mixins: [ShowToastMixin],
  created() {
    this.getCondominos();
  },
  methods: {
    async getCondominos() {
      await baseApi.get("condominos", "nome").then((result) => {
        // result.data.forEach((item) => {
        //   this.condominos.push({ label: item.nome, value: item.id });
        // });
        this.condominos = result.data;
      });
    },
    async saveVeiculo() {
      this.$refs.form.validate().then(() => {
        if (this.edit) {
          this.update();
          return;
        }
        this.insert();
      });
    },
    async insert() {
      if (!this.object.id_condomino) {
        ShowToastMixin.showToast("Informe um condomino válido", "warning");
        return;
      }
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
      delete this.object.condomino;
      delete this.object.endereco;

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
