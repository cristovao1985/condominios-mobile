<template>
  <q-page class="q-ma-md">
    <h6>{{ edit ? `Editar registro #${object.id}` : "Inserir registro" }}</h6>
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
  data() {
    return {
      object: {
        id: 0,
        nome: "",
        telefone: "",
        cpf: "",
        email: "",
        ativo: 1,
        endereco: "",
      },
      tableName: "condominos",
      edit: false,
    };
  },
  computed: {
    btnSaveText() {
      return this.edit ? "Atualizar registro" : "Inserir registro";
    },
  },
  created() {
    if (this.$route.params.id) {
      this.edit = true;
      this.getCondomino();
    } else {
      this.edit = false;
      this.object = {
        nome: "",
        telefone: "",
        cpf: "",
        email: "",
        ativo: 1,
        endereco: "",
      };
      //this.backToList();
    }
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
      delete this.object.id;
      await baseApi
        .insert(this.tableName, this.object)
        .then((result) => {
          if (result.success) {
            ShowToastMixin.showToast(
              "Registro inserido com sucesso",
              "positive"
            );
            this.backToList();
          } else {
            ShowToastMixin.showToast(result.message, "negative");
          }
        })
        .catch((error) => {
          ShowToastMixin.showToast(error.message, "negative");
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
    async getCondomino() {
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
