<template>
  <q-page class="q-ma-md">
    <h6>{{ edit ? `Editar registro #${object.id}` : "Inserir registro" }}</h6>
    <q-form @submit="saveManutencao" ref="form" class="q-gutter-md">
      <q-select
        v-model="object.id_condomino"
        :options="condominos"
        label="Solicitante"
        option-value="id"
        option-label="nome"
        emit-value
        map-options
        :value="object.condomino"
        required
        autofocus
        placeholder="Selecione solicitante"
      />
      <q-input v-model="object.titulo" label="Título" required />
      <q-editor v-model="object.descricao" label="Descrição" />

      <q-input v-model="object.data" label="Data" type="date" />
      <q-checkbox
        v-model="object.feito"
        label="Feito?"
        :true-value="1"
        :false-value="0"
        :value="object.feito"
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
  </q-page>
</template>
<script>
import baseApi from "src/api/base/base.api";

import ShowToastMixin from "../../mixins/notify";
export default {
  name: "Receita",
  data() {
    return {
      object: {
        id_condomino: "",
        descricao: "",
        data: "",
        feito: 0,
        condomino: "",
        id: "",
        titulo: "",
      },
      edit: false,
      tableName: "manutencoes",
      condominos: [],
      categorias: [
        "ÁGUA",
        "ENERGIA",
        "ALVENARIA",
        "ENCANAMENTO",
        "RETIRADA DE LIXO/ENTULHOS",
        "OUTROS",
      ],
    };
  },
  computed: {
    btnSaveText() {
      return this.edit ? "Atualizar registro" : "Inserir registro";
    },
  },
  mixins: [ShowToastMixin],
  async created() {
    this.getCondominos();

    if (this.$route.params.id) {
      this.edit = true;
      await this.getManutencao();
      if (this.edit) {
        this.object.data = this.object.data.substring(0, 10);
      } else {
        this.object.mes = new Date()
          .toLocaleString("pt-br", { month: "long" })
          .toUpperCase();
        this.object = new Date().toISOString().split("T")[0];
      }
    } else {
      this.edit = false;

      this.object.data = new Date().toISOString().split("T")[0];
    }
  },
  methods: {
    async saveManutencao() {
      delete this.object.condomino;
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
    async getManutencao() {
      await baseApi
        .getById(this.tableName, this.$route.params.id)
        .then((result) => {
          if (result.data.length) {
            this.object = result.data[0];
          }
        });
    },
    async getCondominos() {
      await baseApi.get("condominos", "nome").then((result) => {
        // result.data.forEach((item) => {
        //   this.condominos.push({ label: item.nome, value: item.id });
        // });
        this.condominos = result.data;
      });
    },
  },
};
</script>
