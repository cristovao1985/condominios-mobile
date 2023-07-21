<template>
  <q-page class="q-ma-md">
    <h6>{{ edit ? `Editar registro #${object.id}` : "Inserir registro" }}</h6>
    <q-form @submit="saveOcorrencia" ref="form" class="q-gutter-md">
      <q-input
        v-model="object.titulo"
        label="Título"
        :value="object.titulo"
        required
      />
      <q-editor v-model="object.descricao" label="Descrição" required />
      <q-input
        v-model="object.data"
        label="Data ocorrêncuas"
        type="date"
        required
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
  name: "Ocorrencia",
  data() {
    return {
      object: {
        descricao: "",
        titulo: "",
        data: "",
        id: "",
      },
      tableName: "ocorrencias",
      edit: false,
    };
  },
  computed: {
    btnSaveText() {
      return this.edit ? "Atualizar registro" : "Inserir registro";
    },
  },
  mixins: [ShowToastMixin],
  async created() {
    if (this.$route.params.id) {
      this.edit = true;
      await this.getOcorrencia();
      if (this.edit) {
        this.object.data = this.object.data.substring(0, 10);
      } else {
        this.object.data = new Date().toISOString().split("T")[0];
      }
    } else {
      this.edit = false;
      this.object.data = new Date().toISOString().split("T")[0];
    }
  },
  methods: {
    async saveOcorrencia() {
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
    async getOcorrencia() {
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
