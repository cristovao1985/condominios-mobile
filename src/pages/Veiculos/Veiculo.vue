<template>
  <q-page class="q-ma-md">
    <h6>{{ edit ? `Editar registro` : "Inserir registro" }}</h6>
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
      <q-input v-model="object.placa" label="Placa" required />

      <div class="q-mt-md">
        <q-btn
          :label="btnSaveText"
          type="submit"
          class="full-width"
          color="primary"
        />
      </div>
    </q-form>
  </q-page>
</template>
<script>
import baseApi from "src/api/base/base.api";

import ShowToastMixin from "../../mixins/notify";
export default {
  name: "Veiculo",
  data() {
    return {
      object: {
        descricao: "",
        placa: "",
        id_condomino: "",
        id: "",
        condomino: "",
      },
      tableName: "veiculos",
      condominos: [],
      edit: false,
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

    if (this.$route.params.id) {
      this.edit = true;
      this.getVeiculo();
    } else {
      this.edit = false;
      this.object = {};
      //this.backToList();
    }
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
    async getVeiculo() {
      await baseApi
        .getById(this.tableName, this.$route.params.id)
        .then((result) => {
          if (result.data.length) {
            this.object = result.data[0];
          }
        });
    },
  },
};
</script>
